import { IBlogPost } from '@root/features/blog/interfaces/blog.interface';
import BlogPost from '@root/features/blog/models/blog.shema';
import { FilterQuery } from 'mongoose';

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

  async findAll(page = 1, pageSize = 4, search?: string, filter = '', post = 'draft'): Promise<PaginationResult<IBlogPost>> {
    console.log('====filter', filter.toString());
    let query: FilterQuery<IBlogPost> = {};
    let searchQuery = {};

    const projection = {
      _id: 0, // exclude '_id'
      title: 1, // include 'title'
      images: 1,
      createdAt: 1, // include 'createdAt'
      status: 1, // include 'status'
      comments: 1,
      categories: 1,
      tags: 1
      // Add more fields as needed
    };

    if (search && search.trim() && typeof search !== undefined && search !== 'undefined') {
      // Add text search criteria only if search term is provided and not just whitespace
      query = { $text: { $search: search }, status: post };
      searchQuery = { score: { $meta: 'textScore' } }; // Sort by text search score
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

  async findOne(id: string): Promise<IBlogPost | null> {
    return await BlogPost.findById(id);
  }

  async update(id: string, blogPostData: Partial<IBlogPost>): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndUpdate(id, blogPostData, { new: true });
  }

  async delete(id: string): Promise<IBlogPost | null> {
    return await BlogPost.findByIdAndRemove(id);
  }
}

export default BlogPostService;
