import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import s3Service from '../services/s3.service.js';
import ProjectDescription from '../model/projectDescription.model.js';

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

      const images = await s3Service.uploadFiles(files.length ? [files] : [], _id, 'posts');
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
    const posts = await Post.aggregate([
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
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

async function getNewsPost(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const posts = await Post.aggregate([
      {
        $match: {
          postType: 'news',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
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
        $match: {
          postType: 'disscusion',
        },
      },
      {
        $lookup: {
          from: 'comments',
          localField: '_id',
          foreignField: 'postId',
          as: 'comments',
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'userId',
          foreignField: '_id',
          as: 'user',
        },
      },
      {
        $unwind: {
          path: '$user',
          preserveNullAndEmptyArrays: true,
        },
      },
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

async function putLike(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();
  try {
    const { postId } = req.body;
    const { uid } = req;
    const user = await User.findOne({ uid });

    if (user) {
      const post = await Post.findOne({ postId });
      if (post) {
        const { likers } = post;
        console.log(likers);
      
        const { _id } = user;
        console.log(_id);
        console.log(likers.includes(mongoose.Types.ObjectId(_id)));
        if (likers.includes(_id)) {
          // const likers = post.likers.filter(liker => liker !== _id);
          const updatePost = await Post.findOneAndUpdate({ postId }, { $pull: { likers: _id } }, { new: true });
          res.status(201).json({ message: 'Post updated successfully(unlike)', data: updatePost });
        } 
        else {
          const updatePost = await Post.findOneAndUpdate(
            { postId },
            { $push: { likers: mongoose.Types.ObjectId(_id) } },
            { new: true },
          );
          res.status(201).json({ message: 'Post updated successfully(like)', data: updatePost });
        }
      }
      else{
        throw new Error('Post not found');
      }
    }
    else{
      throw new Error('User not found');
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

async function createProject(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();
  console.log("ei")

  try {
    const { uid } = req;
    const user = await User.findOne({ uid });
    const {_id} = user;
    if (user) {
      const { name,intro,type,year,description} = req.body;
      const { files } = req;


      const images = await s3Service.uploadFiles(files, _id, 'posts');
      const newPost = new Post({
        images,
        postType : "project",
        userId : _id
      });
      await newPost.save();

      const projeectDescription = new ProjectDescription({
        name,
        intro,
        type,
        year,
        description,
        postId: newPost._id,
      });

      await projeectDescription.save();
   


    }

    await session.commitTransaction();
    session.endSession();
    res.status(201).json({ message: 'Project created successfully', data: newPost });
  } catch (error) {
    console.log(error);
    await session.commitTransaction();
    session.endSession();
    next(error);
  }
}

async function getAllProjects(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const posts = await Post.aggregate([
      {
        '$match': {
          'postType': 'project'
        }
      }, {
        '$lookup': {
          'from': 'projectdescriptions', 
          'localField': '_id', 
          'foreignField': 'postId', 
          'as': 'projectDetail'
        }
      }, {
        '$unwind': {
          'path': '$projectDetail', 
          'preserveNullAndEmptyArrays': true
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

async function updateProject(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;
    const { uid } = req;
    const user = await User.findOne({ uid });
    if (user) {
      const { name,intro,type,year,description} = req.body;
      const { files } = req;
      console.log(name,intro,type,year,description,files);
      const images = await s3Service.uploadFiles(files, postId, 'posts');
      const updatePost = await Post.findOneAndUpdate(
        { postId },
        { $set: { images } },
        { new: true },
      );
      const updateProject = await ProjectDescription.findOneAndUpdate(
        { postId },
        { $set: { name,intro,type,year,description } },
        { new: true },
      );
      res.status(201).json({ message: 'Post updated successfully', data: updatePost, projectDetail: updateProject });

 

     
    }
    else{
      throw new Error('User not found');
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

async function deleteProject(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const { postId } = req.body;
    const { uid } = req;
    const user = await User.findOne({ uid });
    if (user) {
      const post = await Post.findOne({ postId });
      if (post) {
        await post.remove();
        res.status(200).json({ message: 'Post deleted successfully' });
      }
      else{
        throw new Error('Post not found');
      }
    }
    else{
      throw new Error('User not found');
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

export default {
  createPost,
  deletePostByPostId,
  updatePost,
  getAllPost,
  getNewsPost,
  getDisscusionPost,
  getJobPost,
  getPostByPostId,
  putLike,
  createProject,
  getAllProjects,
  updateProject,
  deleteProject
};