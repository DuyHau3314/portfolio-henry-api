import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { createBlogPostValidationSchema, createCategoryValidationSchema } from '../schemes/blog.sheme';
import { Request, Response } from 'express';
import { IBlogPost } from '../interfaces/blog.interface';
import BlogPostService from '@service/db/blog.service';
import HTTP_STATUS from 'http-status-codes';
import { ICategory } from '../models/category.schema';
import CategoryService from '@service/db/category.service';

export class Create {
  @joiValidation(createBlogPostValidationSchema)
  public async blog(req: Request, res: Response): Promise<void> {
    const newBlogPost: IBlogPost = await BlogPostService.prototype.create(req.body as IBlogPost);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Blog created successfully', newBlogPost });
  }

  @joiValidation(createCategoryValidationSchema)
  public async category(req: Request, res: Response): Promise<void> {
    const { name, tags } = req.body;
    const newCategory: ICategory = await CategoryService.prototype.create({ name, tags } as ICategory);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Category created successfully', newCategory });
  }
}
