import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import Comment from '../model/comment.model.js';
// import s3Service from '../services/s3.service.js';

async function createComment(req, res, next) {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const {uid} = req;
    const { content, postId } = req.body;
    const post = await Post.findOne({ postId });
    const user = await User.findOne({ uid });

    if (post && user) {
      const { _id : postId } = post;
      const {_id : userId} = user;
      const newComment = new Comment({
        content,
        postId,
        userId,
      });

      await newComment.save();
      res.status(201).json({ message: 'Comment created successfully', data: newComment });
    } else {
      res.status(404).json({ message: 'post not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function updateCommentByCommentId(req, res, next) {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const { commentId, content } = req.body;
    const comment = await Comment.findOne({ commentId });
    if (comment) {
      const { _id } = comment;
      const updateComment = await Comment.findOneAndUpdate({ commentId }, { content }, { new: true });
      res.status(200).json({ message: 'Comment updated successfully', data: updateComment });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getAllCommentsByPostId(req, res, next) {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;
    console.log(postId);
    const comments = await Comment.find({ postId }).sort({ date: 1 }).exec();
    if (comments.length) {
      res.status(200).json({ message: 'Comments found successfully', data: comments });
    } else {
      res.status(404).json({ message: 'Comments not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();
    console.log(error);
    next(error);
  }
}
async function deleteCommentByCommentId(req, res, next) {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const { commentId } = req.body;
    const comment = await Comment.findOne({ _id: commentId });
    if (comment) {
      await Comment.findOneAndRemove({ _id: commentId });
      res.status(200).json({ message: 'Comment deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comment not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deleteAllCommentByPostId(req, res, next) {
  const session = await Comment.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;
    const comments = await Comment.find({ postId: mongoose.Types.ObjectId(postId) });
    if (comments) {
      await Comment.deleteMany({ postId: mongoose.Types.ObjectId(postId) });
      res.status(200).json({ message: 'Comments deleted successfully' });
    } else {
      res.status(404).json({ message: 'Comments not found' });
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
  createComment,
  updateCommentByCommentId,
  getAllCommentsByPostId,
  deleteCommentByCommentId,
  deleteAllCommentByPostId,
};
