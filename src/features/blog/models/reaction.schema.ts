import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
  type: { type: String, enum: ['happy', 'like', 'dislike'] },
  count: { type: Number, default: 0 },
  blogId: { type: Schema.Types.ObjectId, ref: 'BlogPost' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  emotions: {
    happy: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    dislike: { type: Number, default: 0 }
  }
});

export default mongoose.model('Reaction', ReactionSchema);
