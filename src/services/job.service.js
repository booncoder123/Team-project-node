import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import Job from '../model/job.model.js';

async function createJob(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { description, images, postType, uid } = req.body;
    const user = await User.findOne({ uid });
    if (user) {
      const { files } = req;
      const { _id } = user;

      images = await s3Service.uploadFiles(files, _id, 'jobs');
      const newJob = new Job({
        description,
        images,
        postType,
        userId: _id,
      });

      await newJob.save();
      res.status(201).json({ message: 'Job created successfully', data: newJob });
    } else {
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}
async function updateJobByJobId(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const { jobId, description, images, postType, uid } = req.body;
    const user = await User.findOne({ uid });
    if (user) {
      const { _id } = user;
      //! images file from user
      const { files } = req;

      images = await s3Service.uploadFiles(files, _id, 'jobs');
      const updateJob = await Job.findOneAndUpdate({ jobId }, { description, images, postType }, { new: true });
      res.status(200).json({ message: 'Job updated successfully', data: updateJob });
      res.status(404).json({ message: 'User not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function deleteJobByJobId(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const { jobId } = req.body;

    const job = await Job.findOne({ jobId });
    if (job) {
      const deleteJob = await Job.findOneAndDelete({ jobId });
      res.status(200).json({ message: 'Job deleted successfully', data: deleteJob });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getAllJobs(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const jobs = await Job.find({});
    res.status(200).json({ message: 'Jobs fetched successfully', data: jobs });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

async function getJobByJobId(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const { jobId } = req.body;
    const job = await Job.findOne({ jobId });
    if (job) {
      res.status(200).json({ message: 'Job fetched successfully', data: job });
    } else {
      res.status(404).json({ message: 'Job not found' });
    }

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    await session.commitTransaction();
    session.endSession();

    next(error);
  }
}

export default { createJob, updateJobByJobId, deleteJobByJobId, getAllJobs, getJobByJobId };
