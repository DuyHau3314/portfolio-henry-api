import { IPortfolioDocument } from '@portfolio/interfaces/portfolio.schema';
import { PortfolioModel } from '@portfolio/models/portfolio.schema';

type PortfolioKeys = keyof IPortfolioDocument;

class PortfolioService {
  // Create a new portfolio
  public async createPortfolio(data: IPortfolioDocument): Promise<IPortfolioDocument> {
    const newPortfolio = await PortfolioModel.create(data);
    return newPortfolio;
  }

  // Get all portfolios
  public async getPortfolios(): Promise<IPortfolioDocument[]> {
    const portfolios: IPortfolioDocument[] = (await PortfolioModel.find()
      .populate({
        path: 'experienceId',
        populate: {
          path: 'projectIds',
          model: 'Project',
          options: { sort: { endDate: -1 } } // Sorting projects by createdAt in descending order
        }
      })
      .lean()) as IPortfolioDocument[];

    return portfolios;
  }

  // Get a single portfolio by ID
  public async getPortfolioById(id: string): Promise<IPortfolioDocument | null> {
    const portfolio = await PortfolioModel.findById(id).populate('experienceId').exec();

    return portfolio;
  }

  // Update a portfolio
  public async updatePortfolio(id: string, data: IPortfolioDocument): Promise<IPortfolioDocument | null> {
    const portfolioDocument = await PortfolioModel.findById(id);

    if (!portfolioDocument) {
      return null;
    }

    // Remove field has  empty value
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        if (data[key as PortfolioKeys] === '') {
          delete data[key as PortfolioKeys];
        }
      }
    }

    // Update fields
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        (portfolioDocument as any)[key] = data[key as PortfolioKeys];
      }
    }

    // Save updated portfolio
    const updatedPortfolio = await portfolioDocument.save();
    return updatedPortfolio;
  }
  // Delete a portfolio
  public async deletePortfolio(id: string): Promise<{ deletedCount?: number }> {
    const result = await PortfolioModel.deleteOne({ _id: id }).exec();
    return result;
  }
}

export const portfolioService: PortfolioService = new PortfolioService();
