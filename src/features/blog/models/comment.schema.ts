import mongoose from 'mongoose';
import { IComment } from '../interfaces/blog.interface';

const commentSchema = new mongoose.Schema({
  content: { type: String, required: true },
  name: { type: String, default: 'Anonymous' },
  post: { type: mongoose.Schema.Types.ObjectId, ref: 'BlogPost' },
  createdAt: { type: Date, default: Date.now }
});

export const Comment = mongoose.model<IComment>('Comment', commentSchema);
