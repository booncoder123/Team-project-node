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
    userId: {
      type: mongoose.Types.ObjectId,
      userId: '',
      require: true
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('comment', Comment);
