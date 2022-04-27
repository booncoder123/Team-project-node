import mongoose from 'mongoose';
const { Schema } = mongoose;

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
      enum: ['news', 'discussion', 'project'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      required: true,
      unique: false,
    },
    likers : {
      type: Array,
      of: Schema.Types.ObjectId,
    }
   
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('post', Post);
