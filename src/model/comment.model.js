import mongoose from 'mongoose';

const Comment = new mongoose.Schema(
  {
    content: {
      type: String,
      lowercase: true,
    },
    postId: {
      type: mongoose.Types.ObjectId,
   
      require: true,
      unique: false,
      
    },
    userId: {
      type: mongoose.Types.ObjectId,
  require: true,
      unique: false,
   
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('comment', Comment);
