import { IBlogPost, IComment } from '@root/features/blog/interfaces/blog.interface';
import BlogPost from '@root/features/blog/models/blog.shema';
import { Comment } from '@root/features/blog/models/comment.schema';
import mongoose, { FilterQuery, mongo } from 'mongoose';

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
    console.log('====filter', filter);
    let query: FilterQuery<IBlogPost> = {};
    let searchQuery = {};

    const projection = {
      _id: 1, // exclude '_id'
      title: 1, // include 'title'
      images: 1,
      createdAt: 1, // include 'createdAt'
      status: 1, // include 'status'
      comments: 1,
      categories: 1,
      tags: 1,
      slug: 1
      // Add more fields as needed
    };

    if (search && search.trim() && typeof search !== undefined && search !== 'undefined') {
      // Add text search criteria only if search term is provided and not just whitespace
      query = { $text: { $search: search }, status: post };
      searchQuery = { score: { $meta: 'textScore' } }; // Sort by text search score
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

      console.log('===convertedObject', convertedObject);

      query = { status: post, ...convertedObject };
    }

    const totalItems = await BlogPost.countDocuments(query);
    const totalPages = Math.ceil(totalItems / pageSize);

    const data = (await BlogPost.find(query, projection)
      .sort(searchQuery)
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

  async addComment(post: string, comment: IComment): Promise<IComment | null> {
    return await Comment.create({ ...comment, post });
  }
}

export default BlogPostService;
