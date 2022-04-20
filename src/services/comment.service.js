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
    // const post = await Post.findOne({ postId });
    const user = await User.findOne({ uid });
    const { _id } = user;

   console.log("Post Id",postId)


      const newComment = new Comment({
        content,
        postId,
        userId:_id,
      });

    const  updatedComment =  await newComment.save();
     const { _id: commentId } = updatedComment;

      const comment = await Comment.aggregate([
        {
          '$match': {
            '_id': commentId
          }
        }, {
          '$lookup': {
            'from': 'users', 
            'localField': 'userId', 
            'foreignField': '_id', 
            'as': 'user'
          }
        }, {
          '$unwind': {
            'path': '$user', 
            'preserveNullAndEmptyArrays': true
          }
        }
      ]);


      res.status(201).json({ message: 'Comment created successfully', data: comment });
   

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
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
    console.log("eiei")
    const { postId } = req.body;
    console.log(postId);
    const comments = await Comment.aggregate([
      {
        '$lookup': {
          'from': 'users', 
          'localField': 'userId', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$unwind': {
          'path': '$user', 
          'preserveNullAndEmptyArrays': true
        }
      }, {
        '$match': {
          'postId': mongoose.Types.ObjectId(postId)
        }
      }
    ]).sort({ date: 1 }).exec();

    console.log(comments);
    if (comments.length) {
      res.status(200).json({ message: 'Comments found successfully', data: comments });
    } else {
      res.status(404).json({ message: 'Comments not found',data: [] });
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
