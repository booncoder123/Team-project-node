import mongoose from 'mongoose';

const Job = new mongoose.Schema(
  {
    companyName: {
      type: String,
      lowercase: true,
    },
    title: {
      type: String,
      lowercase: true,
    },
    description: {
      type: String,
      lowercase: true,
    },
    images: {
      type: Array,
      of: String,
    },
    types: {
      type: String,
      enum: ['full-time', 'part-time', 'intern'],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: '',
    },
    applyLink: {
      type: String,
      lowercase: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('job', Job);
