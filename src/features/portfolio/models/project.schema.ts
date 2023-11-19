import { Schema, model } from 'mongoose';
import { IProjectDocument } from '../interfaces/portfolio.schema';

const projectSchema: Schema = new Schema({
  name: { type: String, required: true },
  responsibility: { type: String, required: true },
  domain: { type: String, required: true },
  type: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  title: { type: String, required: true },
  image: { type: String, required: false }
});

const ProjectModel = model<IProjectDocument>('Project', projectSchema, 'Project');

export { ProjectModel };
