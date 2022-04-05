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
    postType: {
      type: String,
      enum: ['news', 'disscusion', 'project'],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      default: '',
    },
    type: {
      type: String,
      enum: ['student', 'teacher'],
    },
    uid: {
      type: mongoose.Types.ObjectId,
      unique: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('job', Job);
