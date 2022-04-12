import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import s3Service from '../services/s3.service.js';

async function createPost(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const { uid } = req;

    const { description, postType } = req.body;
    const { files } = req;

    const user = await User.findOne({ uid });
    if (user) {
      const { _id } = user;
      //! images file from user

      const images = await s3Service.uploadFiles(files, _id, 'posts');
      const newPost = new Post({
        description,
        images,
        postType,
        userId: _id,
      });

      await newPost.save();
      res.status(201).json({ message: 'Post created successfully', data: newPost });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
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
    const { description, postType, likes, postId } = req.body;
    const post = Post.findOne({ postId });
    if (post) {
      const { files } = req;

      const images = await s3Service.uploadFiles(files, postId, 'posts');
      const updatePost = await Post.findOneAndUpdate(
        { postId },
        { description, images, postType, likes },
        { new: true },
      );
      res.status(201).json({ message: 'Post updated successfully', data: updatePost });
    } else {
      res.status(404).json({ message: 'Post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getAllPost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const posts = await Post.find({});
    res.status(200).json({ message: 'Posts fetched successfully', data: posts });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getNewsPost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const posts = await Post.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }, {
        '$match': {
          'postType': 'news'
        }
      }
    ]);
    res.status(200).json({ message: 'Posts fetched successfully', data: posts });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getDisscusionPost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const posts = await Post.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user'
        }
      }, {
        '$match': {
          'postType': 'disscusion'
        }
      }
    ]);
    res.status(200).json({ message: 'Posts fetched successfully', data: posts });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getJobPost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const posts = await Post.find({ postType: 'project' });
    res.status(200).json({ message: 'Posts fetched successfully', data: posts });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getPostByPostId(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;

    const post = await Post.findOne({ postId });
    if (post) {
      res.status(200).json({ message: 'Post fetched successfully', data: post });
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

export default {
  createPost,
  deletePostByPostId,
  updatePost,
  getAllPost,
  getNewsPost,
  getDisscusionPost,
  getJobPost,
  getPostByPostId,
};
