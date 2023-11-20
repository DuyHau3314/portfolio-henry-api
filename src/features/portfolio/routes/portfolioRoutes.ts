import { authMiddleware } from '@global/helpers/auth-middleware';
import { Create } from '@portfolio/controllers/create-portfolio';
import { Delete } from '@portfolio/controllers/delete-portfolio';
import { Get } from '@portfolio/controllers/get-portfolio';
import { Update } from '@portfolio/controllers/update-portfolio';
import express, { Router } from 'express';

class PortfolioRoutes {
  private router: Router;

  constructor() {
    this.router = express.Router();
  }

  public routes(): Router {
    // Portfolio
    this.router.post('/portfolio', authMiddleware.checkAuthentication, Create.prototype.portfolio);
    this.router.post('/project', authMiddleware.checkAuthentication, Create.prototype.project);
    this.router.post('/education-experience', authMiddleware.checkAuthentication, Create.prototype.educationAndExperience);

    this.router.get('/portfolio', authMiddleware.checkAuthentication, Get.prototype.portfolio);
    this.router.get('/project/:projectId', authMiddleware.checkAuthentication, Get.prototype.project);
    this.router.get(
      '/education-experience',
      authMiddleware.checkAuthentication,
      Get.prototype.educationAndExperience
    );

    this.router.put('/portfolio/:portfolioId', authMiddleware.checkAuthentication, Update.prototype.portfolioById);
    this.router.put('/project/:projectId', authMiddleware.checkAuthentication, Update.prototype.projectById);
    this.router.put(
      '/education-experience/:educationExperienceId',
      authMiddleware.checkAuthentication,
      Update.prototype.educationAndExperienceById
    );

    this.router.delete('/portfolio/:portfolioId', authMiddleware.checkAuthentication, Delete.prototype.portfolioById);
    this.router.delete('/project/:projectId', authMiddleware.checkAuthentication, Delete.prototype.projectById);
    this.router.delete(
      '/education-experience/:educationExperienceId',
      authMiddleware.checkAuthentication,
      Delete.prototype.educationAndExperience
    );
    return this.router;
  }
}

export const portfolioRoutes: PortfolioRoutes = new PortfolioRoutes();
