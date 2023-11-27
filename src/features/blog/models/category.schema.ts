import mongoose, { Document, Schema } from 'mongoose';

export interface ICategory extends Document {
  name: string;
  tags: string[];
}

const categorySchema: Schema = new Schema({
  name: { type: String, required: true, unique: true },
  tags: { type: [{ type: String }], required: true, unique: true }
});

export const Category = mongoose.model<ICategory>('Category', categorySchema);
