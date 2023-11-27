import mongoose from 'mongoose';
import { IBlogPost } from '../interfaces/blog.interface';
import slugify from 'slugify';

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  images: [{ type: String, required: true }],
  emotions: [
    {
      type: { type: String, enum: ['happy', 'agree', 'disagree'] },
      count: { type: Number, default: 0 }
    }
  ],
  categories: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }],
  slug: { type: String, unique: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'draft' }
});

blogPostSchema.pre<IBlogPost>('save', function (next) {
  if (this.title && this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

blogPostSchema.index({ title: 'text', content: 'text' });

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

export default BlogPost;
