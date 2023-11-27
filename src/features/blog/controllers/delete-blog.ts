import BlogPostService from '@service/db/blog.service';
import { Request, Response } from 'express';
import { IBlogPost } from '../interfaces/blog.interface';
import HTTP_STATUS from 'http-status-codes';
import CategoryService from '@service/db/category.service';

export class Delete {
  public async blog(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const deletedBlogPost: IBlogPost = (await BlogPostService.prototype.delete(id)) as IBlogPost;
    res.status(HTTP_STATUS.OK).json({ message: 'Blog deleted successfully', deletedBlogPost });
  }

  public async category(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const deletedCategory = await CategoryService.prototype.delete(id);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Delete successfully', deletedCategory });
  }
}
