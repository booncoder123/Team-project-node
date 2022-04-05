import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
  {
    content: {
      type: String,
      lowercase: true,
    },
    postId: {
      type: mongoose.Types.ObjectId,
      default: '',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('comment', Comment);
