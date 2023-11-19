import { portfolioWorker } from '@worker/portfolio.worker';
import { BaseQueue } from './base.queue';
import { IPortfolioJob } from '@portfolio/interfaces/portfolio.schema';

class PortfolioQueue extends BaseQueue {
  constructor() {
    super('portfolios');

    this.processJob('createPortfolio', 5, portfolioWorker.addPortfolioToDB);
    this.processJob('updatePortfolio', 5, portfolioWorker.updatePortfolioToDB);
    this.processJob('deletePortfolio', 5, portfolioWorker.deletePortfolioToDB);
    this.processJob('createProject', 5, portfolioWorker.addProjectToDB);
    this.processJob('updateProject', 5, portfolioWorker.updateProjectToDB);
    this.processJob('deleteProject', 5, portfolioWorker.deleteProjectToDB);
    this.processJob('createEducationAndExperience', 5, portfolioWorker.addEducationAndExperienceToDB);
    this.processJob('updateEducationAndExperience', 5, portfolioWorker.updateEducationAndExperienceToDB);
    this.processJob('deleteEducationAndExperience', 5, portfolioWorker.deleteEducationAndExperienceToDB);
  }

  public addPortfolioJob(name: string, data: Partial<IPortfolioJob>): void {
    this.addJob(name, data);
  }
}

export const portfolioQueue: PortfolioQueue = new PortfolioQueue();
