// create-portfolio.ts
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import {
  createEducationAndExperienceSchema,
  createPortfolioSchema,
  createProjectSchema,
  updatePortfolioSchema,
  updateProjectSchema
} from '../schemes/portfolioSchema';
import { portfolioQueue } from '@service/queues/portfolio.queue';

export class Create {
  @joiValidation(createPortfolioSchema)
  public async portfolio(req: Request, res: Response): Promise<void> {
    const { name, description, image, shortDescription, mainDescription, projectsCompleted, satisfiedClients, experienceId, shortInfo } =
      req.body;

    portfolioQueue.addPortfolioJob('createPortfolio', {
      value: {
        name,
        description,
        image,
        shortDescription,
        mainDescription,
        projectsCompleted,
        satisfiedClients,
        experienceId,
        shortInfo
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Portfolio created successfully'
    });
  }

  @joiValidation(createProjectSchema)
  public async project(req: Request, res: Response): Promise<void> {
    const { name, responsibility, type, domain, startDate, endDate, title, images } = req.body;

    portfolioQueue.addPortfolioJob('createProject', {
      value: {
        name,
        responsibility,
        type,
        domain,
        startDate,
        endDate,
        title,
        images
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Project created successfully'
    });
  }

  @joiValidation(createEducationAndExperienceSchema)
  public async educationAndExperience(req: Request, res: Response): Promise<void> {
    const { skillSet, responsibilities } = req.body;

    portfolioQueue.addPortfolioJob('createEducationAndExperience', {
      value: {
        skillSet,
        responsibilities
      }
    });

    res.status(HTTP_STATUS.CREATED).json({
      message: 'Education and experience created successfully'
    });
  }

  @joiValidation(updatePortfolioSchema)
  public async portfolioById(req: Request, res: Response): Promise<void> {
    const { name, description, image, shortDescription, mainDescription, projectsCompleted, satisfiedClients, experienceId } = req.body;
    const { portfolioId } = req.params;

    portfolioQueue.addPortfolioJob('updatePortfolio', {
      value: {
        portfolioId,
        name,
        description,
        image,
        shortDescription,
        mainDescription,
        projectsCompleted,
        satisfiedClients,
        experienceId
      }
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Portfolio updated successfully'
    });
  }

  @joiValidation(updateProjectSchema)
  public async projectById(req: Request, res: Response): Promise<void> {
    const { name, responsibility, type, domain, startDate, endDate, title, images } = req.body;
    const { projectId } = req.params;

    portfolioQueue.addPortfolioJob('updateProject', {
      value: {
        projectId,
        name,
        responsibility,
        type,
        domain,
        startDate,
        endDate,
        title,
        images
      }
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Project updated successfully'
    });
  }
}
