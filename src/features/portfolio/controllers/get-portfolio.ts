import { educationAndExperienceService } from '@service/db/educationAndExperience.service';
import { portfolioService } from '@service/db/portfolio.service';
import HTTP_STATUS from 'http-status-codes';
import { Request, Response } from 'express';
import { projectService } from '@service/db/project.service';

export class Get {
  public async portfolio(req: Request, res: Response): Promise<void> {
    const portfolios = await portfolioService.getPortfolios();

    res.status(HTTP_STATUS.OK).json({
      message: 'Portfolios fetched successfully',
      data: portfolios
    });
  }

  public async educationAndExperience(req: Request, res: Response): Promise<void> {
    const educationAndExperience = await educationAndExperienceService.getEducationAndExperiences();

    res.status(HTTP_STATUS.OK).json({
      message: 'Education and experience fetched successfully',
      data: educationAndExperience
    });
  }

  public async project(req: Request, res: Response): Promise<void> {
    const { projectId } = req.params;
    const project = projectService.getProjectById(projectId);

    res.status(HTTP_STATUS.OK).json({
      message: 'Project fetched successfully',
      data: project
    });
  }
}
