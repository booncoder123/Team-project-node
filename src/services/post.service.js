import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
// import s3Service from '../services/s3.service.js';

async function createPost(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const { uid, description, images, postType, type, likes } = req.body;

    const user = await User.findOne({ uid });
    if (user) {
      const { _id } = user;
      //! images file from user
      const { files } = req;

      images = await s3Service.uploadFiles(files, uid, 'posts');
      const newPost = new Post({
        description,
        images,
        postType,
        userId: _id,
        type,
        uid,
        likes,
      });

      await newPost.save();
      res.status(201).json({ message: 'Post created successfully', data: newUser });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deletePostByPostId(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;

    const post = await Post.findOne({ postId });
    if (post) {
      const deletePost = await Post.findOneAndDelete({ postId });
      res.status(200).json({ message: 'Post deleted successfully', data: deletePost });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function updatePost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { description, images, postType, type, likes, postId } = req.body;
    const post = Post.findOne({ postId });
    if (post) {
      const { files } = req;
      images = await s3Service.uploadFiles(files, uid, 'posts');
      const newPost = new Post({
        description,
        images: [images],
        postType,
        type,
        likes,
      });
      res.status(201).json({ message: 'Post created successfully', data: newUser });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

export default { createPost, deletePostByPostId, updatePost };
