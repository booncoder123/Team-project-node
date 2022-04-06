import mongoose from 'mongoose';

const Job = new mongoose.Schema(
  {
    description: {
      type: String,
      lowercase: true,
    },
    images: {
      type: Array,
      of: String,
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: '',
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('job', Job);
