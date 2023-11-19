import { Schema, model } from 'mongoose';
import { IEducationAndExperienceDocument } from '../interfaces/portfolio.schema';

const educationAndExperienceSchema: Schema = new Schema({
  // Reference to Project Model
  projectIds: [{ type: Schema.Types.ObjectId, ref: 'Project' }],
  skillSet: [
    {
      name: { type: String, required: true },
      level: { type: Number, required: true }
    }
  ],
  responsibilities: [
    {
      name: { type: String, required: true },
      description: { type: String, required: true }
    }
  ]
});

const EducationAndExperienceModel = model<IEducationAndExperienceDocument>(
  'EducationAndExperience',
  educationAndExperienceSchema,
  'EducationAndExperience'
);

export { EducationAndExperienceModel };
