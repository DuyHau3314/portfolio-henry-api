import { IProjectDocument } from '@portfolio/interfaces/portfolio.schema';
import { ProjectModel } from '@portfolio/models/project.schema';
import { educationAndExperienceService } from './educationAndExperience.service';

type ProjectKeys = keyof IProjectDocument;

class ProjectService {
  // Create a new project
  public async createProject(data: IProjectDocument): Promise<IProjectDocument> {
    const newProject = await ProjectModel.create(data);

    const educationAndExperience = await educationAndExperienceService.getEducationAndExperiences();
    const educationAndExperienceId = educationAndExperience[0]._id;

    educationAndExperienceService.updateEducationAndExperience(educationAndExperienceId, {
      ...educationAndExperience[0],
      projectIds: [...educationAndExperience[0].projectIds, newProject._id]
    });

    return newProject;
  }

  // Get all projects
  public async getProjects(): Promise<IProjectDocument[]> {
    return await ProjectModel.find().lean();
  }

  // Get a single project by ID
  public async getProjectById(id: string): Promise<IProjectDocument | null> {
    return await ProjectModel.findById(id);
  }

  // Update a project
  public async updateProject(id: string, data: IProjectDocument): Promise<IProjectDocument | null> {
    const projectDocument = await ProjectModel.findById(id);

    console.log('===data', data);

    if (!projectDocument) {
      return null;
    }

    // Update fields
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        (projectDocument as any)[key] = data[key as ProjectKeys];
      }
    }

    // Save updated portfolio
    const updatedPortfolio = await projectDocument.save();
    return updatedPortfolio;
  }

  // Delete a project
  public async deleteProject(id: string): Promise<{ deletedCount?: number }> {
    const result = await ProjectModel.deleteOne({ _id: id });
    return result;
  }
}

export const projectService: ProjectService = new ProjectService();
