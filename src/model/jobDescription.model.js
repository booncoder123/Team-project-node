import mongoose from 'mongoose';

const JobDescription = new mongoose.Schema(
  {
    Company: {
      type: String,
      lowercase: true,
    },
    jobTitle: {
      type: String,
      lowercase: true,
    },
    type: {
      type: [String],
      enum: ['intern', 'full-time', 'past-time','ta'],
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

export default mongoose.model('jobDescription', JobDescription);
