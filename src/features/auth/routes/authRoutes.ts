import { Password } from '@auth/controllers/password';
import { SignIn } from '@auth/controllers/signin';
import { SignOut } from '@auth/controllers/signout';
import { SignUp } from '@auth/controllers/signup';
import { Get as GetBlog } from '@root/features/blog/controllers/get-blog';
import { Update as UpdateBlog } from '@root/features/blog/controllers/update-blog';
import { Get as GetPortfolio } from '@portfolio/controllers/get-portfolio';

import express, { Router } from 'express';

class AuthRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    this.router.post('/signup', SignUp.prototype.create);
    this.router.post('/google-signup', SignUp.prototype.googleSignup);
    this.router.post('/signin', SignIn.prototype.read);
    this.router.post('/forgot-password', Password.prototype.create);
    this.router.post('/reset-password/:token', Password.prototype.update);
    this.router.post('/google-token', SignIn.prototype.googleSignin);
    // Public router
    this.router.get('/portfolio', GetPortfolio.prototype.portfolio);
    this.router.get('/blog/:slug', GetBlog.prototype.blog);
    this.router.get('/blogs', GetBlog.prototype.blogs);
    this.router.get('/blogs/search', GetBlog.prototype.blogs);
    this.router.put('/blog/:id/comment', UpdateBlog.prototype.comment);
    this.router.put('/blog/:id/emotion', UpdateBlog.prototype.emotion);
    this.router.get('/blog/:id/reactions', GetBlog.prototype.reactions);
    this.router.get('/comments/blog/:id', GetBlog.prototype.comments);
    this.router.get('/categories', GetBlog.prototype.categories);

    return this.router;
  }

  public signoutRoute(): Router {
    this.router.get('/signout', SignOut.prototype.update);

    return this.router;
  }
}

export const authRoutes: AuthRoutes = new AuthRoutes();
