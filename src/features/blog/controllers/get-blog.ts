import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { IBlogPost } from '../interfaces/blog.interface';
import BlogPostService from '@service/db/blog.service';
import CategoryService from '@service/db/category.service';

export class Get {
  public async blog(req: Request, res: Response): Promise<void> {
    const { slug } = req.params;
    const blog: IBlogPost = (await BlogPostService.prototype.findOne(slug)) as IBlogPost;
    res.status(HTTP_STATUS.OK).json({ message: 'Get blog successfully', blog });
  }

  public async category(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const category = await CategoryService.prototype.findOne(id);
    res.status(HTTP_STATUS.CREATED).json({ message: `Get category ${id} successfully`, category });
  }

  public async categories(req: Request, res: Response): Promise<void> {
    const categories = await CategoryService.prototype.findAll();
    res.status(HTTP_STATUS.CREATED).json({ message: 'Get categories successfully', categories });
  }

  public async blogs(req: Request, res: Response): Promise<void> {
    const { page, pageSize, search, filter } = req.query;
    const blogs = await BlogPostService.prototype.findAll(Number(page), Number(pageSize), String(search), filter as string);
    res.status(HTTP_STATUS.OK).json({ message: 'Get blogs successfully', blogs });
  }

  public async comments(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const comments = await BlogPostService.prototype.findComments(id);
    res.status(HTTP_STATUS.OK).json({ message: 'Get comments successfully', comments });
  }
}
