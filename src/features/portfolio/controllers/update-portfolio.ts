// create-portfolio.ts
import { joiValidation } from '@global/decorators/joi-validation.decorators';
import { portfolioQueue } from '@service/queues/portfolio.queue';
import { Request, Response } from 'express';
import HTTP_STATUS from 'http-status-codes';
import { updateEducationAndExperienceSchema, updatePortfolioSchema, updateProjectSchema } from '../schemes/portfolioSchema';

export class Update {
  @joiValidation(updatePortfolioSchema)
  public async portfolioById(req: Request, res: Response): Promise<void> {
    const { portfolioId } = req.params;

    portfolioQueue.addPortfolioJob('updatePortfolio', {
      id: portfolioId,
      value: req.body
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Portfolio updated successfully'
    });
  }

  @joiValidation(updateProjectSchema)
  public async projectById(req: Request, res: Response): Promise<void> {
    const { name, responsibility, type, domain, startDate, endDate, title, image } = req.body;
    const { projectId } = req.params;

    portfolioQueue.addPortfolioJob('updateProject', {
      id: projectId,
      value: {
        name,
        responsibility,
        type,
        domain,
        startDate,
        endDate,
        title,
        image
      }
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Project updated successfully'
    });
  }

  @joiValidation(updateEducationAndExperienceSchema)
  public async educationAndExperienceById(req: Request, res: Response): Promise<void> {
    const { projectIds, skillSet, responsibilities } = req.body;
    const { educationExperienceId } = req.params;

    portfolioQueue.addPortfolioJob('updateEducationAndExperience', {
      id: educationExperienceId,
      value: {
        projectIds,
        skillSet,
        responsibilities
      }
    });

    res.status(HTTP_STATUS.OK).json({
      message: 'Education and experience updated successfully'
    });
  }
}
