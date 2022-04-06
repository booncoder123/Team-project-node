import mongoose from 'mongoose';

const User = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      lowercase: true,
    },
    lastName: {
      type: String,
      required: true,
      lowercase: true,
    },
    username: {
      type: String,
      required: true,
      lowercase: true,
    },
    email: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    photoURL: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'student',
    },
    uid: {
      type: String,
      unique: true,
    },
  },
  { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } },
);

export default mongoose.model('user', User);
