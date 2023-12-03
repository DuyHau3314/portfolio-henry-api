import { joiValidation } from '@global/decorators/joi-validation.decorators';
import {
  addCommentToBlogValidationSchema,
  updateBlogPostValidationSchema,
  updateCategoryValidationSchema,
  updateEmotionValidationSchema
} from '../schemes/blog.sheme';
import { Request, Response } from 'express';
import BlogPostService from '@service/db/blog.service';
import { IBlogPost, IComment } from '../interfaces/blog.interface';
import HTTP_STATUS from 'http-status-codes';
import CategoryService from '@service/db/category.service';
import { ICategory } from '../models/category.schema';

export class Update {
  @joiValidation(updateBlogPostValidationSchema)
  public async blog(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const newBlogPost = await BlogPostService.prototype.update(id, req.body as Partial<IBlogPost>);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Blog updated successfully', newBlogPost });
  }

  @joiValidation(updateCategoryValidationSchema)
  public async category(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const newCategory = await CategoryService.prototype.update(id, req.body as Partial<ICategory>);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Category updated successfully', newCategory });
  }

  @joiValidation(addCommentToBlogValidationSchema)
  public async comment(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const newBlogPost = await BlogPostService.prototype.addComment(id, req.body as IComment);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Blog added successfully', newBlogPost });
  }

  @joiValidation(updateEmotionValidationSchema)
  public async emotion(req: Request, res: Response): Promise<void> {
    const id = req.params.id;
    const newBlogPost = await BlogPostService.prototype.addEmotion(id, req.body);
    res.status(HTTP_STATUS.CREATED).json({ message: 'Blog added successfully', newBlogPost });
  }
}
