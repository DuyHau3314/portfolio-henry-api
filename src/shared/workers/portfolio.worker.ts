import { config } from '@root/config';
import { educationAndExperienceService } from '@service/db/educationAndExperience.service';
import { portfolioService } from '@service/db/portfolio.service';
import { projectService } from '@service/db/project.service';
import { DoneCallback, Job } from 'bull';
import Logger from 'bunyan';

const log: Logger = config.createLogger('portfolioWorker');

class PortfolioWorker {
  // portfolio
  async addPortfolioToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await portfolioService.createPortfolio(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updatePortfolioToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value, id } = job.data;
      await portfolioService.updatePortfolio(id, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deletePortfolioToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { id } = job.data;
      await portfolioService.deletePortfolio(id);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  // project
  async addProjectToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await projectService.createProject(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updateProjectToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value, id } = job.data;
      await projectService.updateProject(id, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deleteProjectToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { id } = job.data;
      await projectService.deleteProject(id);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  // education and experience
  async addEducationAndExperienceToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value } = job.data;
      await educationAndExperienceService.createEducationAndExperience(value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async updateEducationAndExperienceToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { value, id } = job.data;
      await educationAndExperienceService.updateEducationAndExperience(id, value);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }

  async deleteEducationAndExperienceToDB(job: Job, done: DoneCallback): Promise<void> {
    try {
      const { id } = job.data;
      await educationAndExperienceService.deleteEducationAndExperience(id);
      job.progress(100);
      done(null, job.data);
    } catch (error) {
      log.error(error);
      done(error as Error);
    }
  }
}

export const portfolioWorker: PortfolioWorker = new PortfolioWorker();
