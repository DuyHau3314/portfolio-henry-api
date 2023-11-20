import { Schema, model } from 'mongoose';
import { IPortfolioDocument } from '../interfaces/portfolio.schema';

const portfolioSchema: Schema = new Schema({
  // Introduce
  name: { type: String, required: true },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  shortInfo: { type: String, default: '' },
  // About
  shortDescription: { type: String, default: '' },
  mainDescription: { type: String, default: '' },
  projectsCompleted: { type: Number, default: 0 },
  satisfiedClients: { type: Number, default: 0 },
  // Education & Skills Id (Reference) to EducationAndExperience
  experienceId: { type: Schema.Types.ObjectId, ref: 'EducationAndExperience' }
});

const PortfolioModel = model<IPortfolioDocument>('Portfolio', portfolioSchema, 'Portfolio');

export { PortfolioModel };
