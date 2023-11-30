import mongoose from 'mongoose';
import { IComment } from '../interfaces/blog.interface';

const commentSchema = new mongoose.Schema({
  message: { type: String, required: true },
  name: { type: String, default: 'Anonymous' },
  email: { type: String, required: true },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost', index: true },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
