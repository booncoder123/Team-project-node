import mongoose from 'mongoose';

const Post = new mongoose.Schema(
  {
    description: {
      type: String,
      lowercase: true,
    },

    images: {
      type: Array,
      of: String,
    },
    postType: {
      type: String,
      enum: ['news', 'disscusion', 'project'],
    },
    userId: {
      type: String,
      required: true,
      unique: false,
    },
    likes: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('post', Post);
