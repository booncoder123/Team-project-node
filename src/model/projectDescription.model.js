import mongoose from 'mongoose';

const ProjectDescription = new mongoose.Schema(
  {
    name: {
      type: String,
      lowercase: true,
    },
    introduction: {
      type: String,
      lowercase: true,
    },
    type: {
      type: [String],
      enum: ['ai', 'iot', 'enterprise'],
    },
    description: {
      type: String,
      default: '',
    },
    postId: {
      type: mongoose.Types.ObjectId,
      default: '',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('projectDescription', ProjectDescription);
