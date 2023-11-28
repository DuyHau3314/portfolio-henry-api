import express, { Router } from 'express';
import { authMiddleware } from '@global/helpers/auth-middleware';
import { Get } from '../controllers/get-blog';
import { Create } from '../controllers/create-blog';
import { Update } from '../controllers/update-blog';
import { Delete } from '../controllers/delete-blog';

class BlogRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Category
    this.router.get('/category/:id', authMiddleware.checkAuthentication, Get.prototype.category);
    this.router.post('/category', authMiddleware.checkAuthentication, Create.prototype.category);
    this.router.put('/category/:id', authMiddleware.checkAuthentication, Update.prototype.category);
    this.router.delete('/category/:id', authMiddleware.checkAuthentication, Delete.prototype.category);

    // Blog
    this.router.post('/blog', authMiddleware.checkAuthentication, Create.prototype.blog);
    this.router.put('/blog/:id', authMiddleware.checkAuthentication, Update.prototype.blog);
    this.router.delete('/blog/:id', authMiddleware.checkAuthentication, Delete.prototype.blog);

    return this.router;
  }
}

export const blogRoutes: BlogRoutes = new BlogRoutes();
