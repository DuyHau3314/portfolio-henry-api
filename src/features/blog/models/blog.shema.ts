import mongoose from 'mongoose';
import { BlogPostModel, IBlogPost } from '../interfaces/blog.interface';
import slugify from 'slugify';
import cheerio from 'cheerio';

const Schema = mongoose.Schema;

const blogPostSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  contentPreview: { type: String },
  images: [{ type: String, required: true }],
  categories: [{ type: String, required: true }],
  tags: [{ type: String, required: true }],
  comments: { type: Number, default: 0 },
  slug: { type: String, unique: true, index: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  status: { type: String, default: 'draft' }
});

function extractPreview(content: string) {
  const $ = cheerio.load(content);
  let previewText = '';
  $('p')
    .slice(0, 2)
    .each(function () {
      previewText += $(this).text();
    });

  return previewText.length > 200 ? previewText.substring(0, 200) + '...' : previewText;
}
blogPostSchema.pre<IBlogPost>('save', function (next) {
  if (this.content && (this.isNew || this.isModified('content'))) {
    this.contentPreview = extractPreview(this.content);
  }

  if (this.title && this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

// blogPostSchema.statics.updateEmotion = async function (postId, oldEmotion, newEmotion) {
//   const blogPost = await this.findById(postId);
//   if (!blogPost) throw new Error('Post not found');

//   // Decrease the count of the old emotion
//   if (oldEmotion) {
//     const oldEmotionObj = blogPost.emotions.find((e: any) => e.type === oldEmotion);
//     if (oldEmotionObj) {
//       oldEmotionObj.count = Math.max(0, oldEmotionObj.count - 1);
//       // If the count goes to zero, consider removing the emotion object from the array
//       if (oldEmotionObj.count === 0) {
//         const index = blogPost.emotions.indexOf(oldEmotionObj);
//         if (index > -1) {
//           blogPost.emotions.splice(index, 1);
//         }
//       }
//     }
//   }

//   // Increase the count of the new emotion only if newEmotion is provided
//   if (newEmotion) {
//     const newEmotionObj = blogPost.emotions.find((e: any) => e.type === newEmotion);
//     if (newEmotionObj) {
//       newEmotionObj.count += 1;
//     } else {
//       blogPost.emotions.push({ type: newEmotion, count: 1 });
//     }
//   }

//   await blogPost.save();
//   return blogPost;
// };

blogPostSchema.index({ title: 'text', content: 'text' });

const BlogPost: BlogPostModel = mongoose.model<IBlogPost, BlogPostModel>('BlogPost', blogPostSchema);

export default BlogPost;
