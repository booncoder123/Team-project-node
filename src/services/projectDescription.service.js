import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import projectDescriptionModel from '../model/projectDescription.model.js';

async function postProjectDescriptionByPostId(req, res, next) {
  const session = await projectDescriptionModel.startSession();
  session.startTransaction();

  try {
    const { description, name, introduction, type, year, postId } = req.body;
    const post = await Post.findOne({ postId });
    if (post) {
      const { postType } = post;
      if (postType === 'project') {
        const newProjectDescription = new projectDescriptionModel({
          description,
          name,
          introduction,
          type,
          year,
          postId,
        });

        await newProjectDescription.save();
        res.status(201).json({ message: 'Project description created successfully', data: newProjectDescription });
      } else {
        res.status(404).json({ message: 'Project is not project' });
      }
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

async function updateProjectDescriptionByProjectId(req, res, next) {
  const session = await projectDescriptionModel.startSession();
  session.startTransaction();
  try {
    const { description, name, introduction, type, year, postId } = req.body;
    const projectDescription = await projectDescriptionModel.findOne({ postId });
    if (projectDescription) {
      const { _id: projectId } = projectDescription;
      const newProjectDescription = await projectDescriptionModel.findOneAndUpdate(
        { projectId },
        {
          description,
          name,
          introduction,
          type,
          year,
          postId,
        },
        { new: true },
      );
      res.status(200).json({ message: 'Project description updated successfully', data: newProjectDescription });
    } else {
      res.status(404).json({ message: 'Project description not found' });
    }
    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getProjectDescriptionByProjectId(req, res, next) {
  const session = await projectDescriptionModel.startSession();
  session.startTransaction();
  try {
    const { projectId: postId } = req.body;
    const projectDescription = await projectDescriptionModel.findOne({ postId });
    if (projectDescription) {
      res.status(200).json({ message: 'Project description found', data: projectDescription });
    } else {
      res.status(404).json({ message: 'Project description not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deleteProjectDescriptionByProjectId(req, res, next) {
  const session = await projectDescriptionModel.startSession();
  session.startTransaction();
  try {
    const { projectId: postId } = req.body;
    const projectDescription = await projectDescriptionModel.findOne({ postId });
    if (projectDescription) {
      const { _id: projectId } = projectDescription;
      const deleteProjectDescription = await projectDescriptionModel.findOneAndDelete({ projectId });
      res.status(200).json({ message: 'Project description deleted successfully', data: deleteProjectDescription });
    } else {
      res.status(404).json({ message: 'Project description not found' });
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
  postProjectDescriptionByPostId,
  updateProjectDescriptionByProjectId,
  getProjectDescriptionByProjectId,
  deleteProjectDescriptionByProjectId,
};
