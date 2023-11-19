import { ObjectId, Types } from 'mongoose';

export interface IPortfolioDocument extends Document {
  // Introduce
  _id: string;
  name: string;
  shortInfo: string;
  description: string;
  image: string;
  // About
  shortDescription: string;
  mainDescription: string;
  projectsCompleted: number;
  satisfiedClients: number;
  // Education & Skills objectid
  experienceId: Types.ObjectId | string;
}

export interface IProjectDocument extends Document {
  name: string;
  responsibility: string;
  domain: string;
  type: string; //full-time, part-time, freelance
  startDate: Date;
  endDate: Date;
  title: string;
}

interface SkillItem {
  name: string;
  level: number; //1-10
}

export interface IEducationAndExperienceDocument extends Document {
  _id: string | Types.ObjectId;
  projectIds: (string | Types.ObjectId)[];
  skillSet: SkillItem[];
  responsibilities: {
    name: string;
    description: string;
  }[];
}

export interface IPortfolioJob {
  id?: string;
  value: {
    portfolioId?: string;
    name?: string;
    shortInfo?: string;
    description?: string;
    image?: string;
    shortDescription?: string;
    mainDescription?: string;
    projectsCompleted?: number;
    satisfiedClients?: number;
    experienceId?: string;
    // Education & Skills
    projectIds?: string[];
    skillSet?: SkillItem[];
    responsibilities?: {
      name: string;
      description: string;
    }[];
    // Projects
    projectId?: string;
    responsibility?: string;
    domain?: string;
    type?: string; //full-time, part-time, freelance
    startDate?: Date;
    endDate?: Date;
    title?: string;
  };
}
