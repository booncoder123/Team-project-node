import mongoose from 'mongoose';

const ProjectDescription = new mongoose.Schema(
  { name: {
      type: String,
      lowercase: true,
    },
    type: {
      type: [String],
      enum: ['ai', 'iot', 'enterprise'],
    },
    postId: {
      type: mongoose.Types.ObjectId,
      default: '',
      require: true,
    },
    intro: {
      type: String,
      default: '',

    },
    projectDescription: {
      type: String,
      default: '',

    },
    year: {
     type : [Number],
     enum: [1,2,3,4],
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('projectDescription', ProjectDescription);
