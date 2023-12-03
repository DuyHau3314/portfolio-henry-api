import mongoose, { Model } from 'mongoose';

export interface IEmotion {
  type: 'happy' | 'agree' | 'disagree' | 'more';
  count: number;
}

export interface IComment extends mongoose.Document {
  message: string;
  name: string;
  email: string;
  post: mongoose.Types.ObjectId;
  createdAt?: Date;
}

export interface IBlogPost extends mongoose.Document {
  title: string;
  content: string;
  contentPreview: string;
  images: string[];
  emotions: IEmotion[];
  comments: number;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BlogPostModel extends Model<IBlogPost> {
  updateEmotion(postId: string, oldEmotion: string, newEmotion: string): Promise<IBlogPost>;
}

export interface ICategoryDocument extends Document {
  name: string;
  tags: string[];
}
