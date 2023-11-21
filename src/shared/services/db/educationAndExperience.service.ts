import { IEducationAndExperienceDocument } from '@portfolio/interfaces/portfolio.schema';
import { EducationAndExperienceModel } from '@portfolio/models/educationAndExperience';
import { portfolioService } from './portfolio.service';
import { Types } from 'mongoose';

type EducationAndExperienceKeys = keyof IEducationAndExperienceDocument;

class EducationAndExperienceService {
  // Create new Education and Experience
  public async createEducationAndExperience(data: IEducationAndExperienceDocument): Promise<IEducationAndExperienceDocument> {
    const newEducationAndExperience = await EducationAndExperienceModel.create(data);
    const newEducationAndExperienceId = newEducationAndExperience._id;

    const portfolio = await portfolioService.getPortfolios();
    const portfolioId = portfolio[0]._id;

    portfolioService.updatePortfolio(portfolioId, {
      ...portfolio[0],
      experienceId: newEducationAndExperienceId
    });
    return newEducationAndExperience;
  }

  // Get all Education and Experience entries
  public async getEducationAndExperiences(): Promise<IEducationAndExperienceDocument[]> {
    return await EducationAndExperienceModel.find().lean();
  }

  // Get a single Education and Experience entry by ID
  public async getEducationAndExperienceById(id: string): Promise<IEducationAndExperienceDocument | null> {
    return await EducationAndExperienceModel.findById(id);
  }

  // Update Education and Experience entry
  public async updateEducationAndExperience(
    id: string | Types.ObjectId,
    data: IEducationAndExperienceDocument
  ): Promise<IEducationAndExperienceDocument | null> {
    const educationAndExperienceDocument = await EducationAndExperienceModel.findById(id);

    if (!educationAndExperienceDocument) {
      return null;
    }

    // Update fields
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        (educationAndExperienceDocument as any)[key] = data[key as EducationAndExperienceKeys];
      }
    }

    // Save updated portfolio
    const updateEducationAndExperience = await educationAndExperienceDocument.save();
    return updateEducationAndExperience;
  }

  // Delete an Education and Experience entry
  public async deleteEducationAndExperience(id: string): Promise<{ deletedCount?: number }> {
    const result = await EducationAndExperienceModel.deleteOne({ _id: id });
    return result;
  }
}

export const educationAndExperienceService: EducationAndExperienceService = new EducationAndExperienceService();
