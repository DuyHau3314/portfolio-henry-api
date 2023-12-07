import { IBlogPost, IComment } from '@root/features/blog/interfaces/blog.interface';
import BlogPost from '@root/features/blog/models/blog.shema';
import { Comment } from '@root/features/blog/models/comment.schema';
import reactionSchema from '@root/features/blog/models/reaction.schema';
import mongoose, { FilterQuery } from 'mongoose';

interface PaginationResult<T> {
  data: T[];
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
}

class BlogPostService {
  async create(blogPostData: IBlogPost): Promise<IBlogPost> {
    const blogPost = new BlogPost(blogPostData);
    return (await blogPost.save()) as IBlogPost;
  }

  async findAll(page = 1, pageSize = 4, search?: string, filter = '', post = 'published'): Promise<PaginationResult<IBlogPost>> {
    let query: FilterQuery<IBlogPost> = { status: post };
    const searchQuery = {};

    const projection = {
      _id: 1, // exclude '_id'
      title: 1, // include 'title'
      images: 1,
      createdAt: 1, // include 'createdAt'
      status: 1, // include 'status'
      comments: 1,
      categories: 1,
      tags: 1,
      slug: 1,
      contentPreview: 1
      // Add more fields as needed
    };

    if (search && search.trim() && typeof search !== undefined && search !== 'undefined') {
      // Add text search criteria only if search term is provided and not just whitespace
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: { $regex: searchRegex } },
        { content: { $regex: searchRegex } }
        // You can add more fields if needed
      ];
    } else {
      // {categories:[Backend]}
      const convertedObject = {};

      const filterObj = filter ? JSON.parse(filter) : {};

      // remove key with empty value
      for (const key in filterObj as any) {
        if (!filterObj[key as any].length || filterObj[key as any][0] === '') {
          delete filterObj[key as any];
        }
      }

      for (const key in filterObj as any) {
        ((convertedObject as any)[key as any] as any) = { $in: filterObj[key as any] };
      }

      query = { status: post, ...convertedObject };
    }

    const totalItems = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = (await BlogPost.find(query, projection)
      .sort({ ...searchQuery, createdAt: -1 })
      .skip((page - 1) * pageSize)
      .limit(pageSize)) as IBlogPost[];

    return {
      data,
      currentPage: page,
      totalPages,
      pageSize,
      totalItems
    };
  }

  async findOne(slug: string): Promise<IBlogPost | null> {
    return await BlogPost.findOne({ slug });
  }

  async update(id: string, blogPostData: Partial<IBlogPost>): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndUpdate(id, blogPostData, { new: true });
  }

  async delete(id: string): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndRemove(id);
  }

  // id: blog id
  async findComments(id: string): Promise<IComment[] | null> {
    return await Comment.find({ post: new mongoose.Types.ObjectId(id) }).sort({ createdAt: -1 });
  }

  async addComment(post: string, comment: IComment): Promise<any | null> {
    const commentAdded = Comment.create({ ...comment, post });
    // update comment count
    const blog = BlogPost.findByIdAndUpdate(post, { $inc: { comments: 1 } }).exec();

    return Promise.all([commentAdded, blog]);
  }

  async addEmotion(postId: string, emotion: { old: string; new: string }): Promise<any | null> {
    const { old, new: newEmotion } = emotion;
    try {
      const updateReactionQuery = {
        $inc: {
          [`emotions.${old}`]: -1,
          [`emotions.${newEmotion}`]: 1
        }
      };

      const newReaction = await reactionSchema.findOneAndUpdate({ blogId: postId }, updateReactionQuery, { new: true, upsert: true });

      return newReaction;
    } catch (error) {
      console.error('Error updating emotions:', error);
      return null;
    }
  }

  async findReactions(postId: string): Promise<any | null> {
    try {
      const reaction = await reactionSchema.findOne({ blogId: postId });
      return reaction;
    } catch (error) {
      console.error('Error getting reactions:', error);
      return null;
    }
  }
}

export default BlogPostService;
