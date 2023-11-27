import { Category, ICategory } from '@root/features/blog/models/category.schema';

class CategoryService {
  async create(categoryData: ICategory): Promise<ICategory> {
    const category = new Category(categoryData);
    return await category.save();
  }

  async findAll(): Promise<ICategory[]> {
    return await Category.find();
  }

  async findOne(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async update(id: string, categoryData: Partial<ICategory>): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, categoryData, { new: true });
  }

  async delete(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndRemove(id);
  }
}

export default CategoryService;
