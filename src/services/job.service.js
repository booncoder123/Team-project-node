import mongoose from 'mongoose';
import Post from '../model/post.model.js';
import User from '../model/user.model.js';
import Job from '../model/job.model.js';
import s3Service from '../services/s3.service.js';

async function createJob(req, res, next) {
  const session = await User.startSession();
  session.startTransaction();

  try {
    const { description, companyName, types, title, applyLink } = req.body;
    const { uid } = req;
    const user = await User.findOne({ uid });
    if (user) {
      const { files, file } = req;
      const { _id } = user;
      console.log(files);

      const paths = await s3Service.uploadFiles(files, _id, 'jobs');
      const newJob = new Job({
        description,
        companyName,
        types,
        title,
        images: paths,
        userId: _id,
        applyLink,
      });

      await newJob.save();
      res.status(201).json({ message: 'Job created successfully here', data: newJob });
    } else {
      res.status(500).json({ message: 'User not found' });
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
async function updateJobByJobId(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const { jobId, description, companyName, types, title, logo } = req.body;
    const job = await Job.findOne({ jobId });
    if (job) {
      const { files } = req;
      const images = await s3Service.uploadFiles(files ? files : [], jobId, 'jobs');
      const updateJob = await Job.findOneAndUpdate({ jobId }, { companyName, types, title, images }, { new: true });
      res.status(200).json({ message: 'Job updated successfully', data: updateJob });
    } else {
      res.status(404).json({ message: 'Job not found' });
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

async function deleteJobByJobId(req, res, next) {
  const session = await Job.startSession();
  session.startTransaction();
  console.log('hello', req.body.jobId);

  try {
    const { jobId } = req.body;

    const job = await Job.findOne({ _id: jobId });
    if (job) {
      const deleteJob = await Job.findOneAndDelete({ _id: jobId });
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
    console.log(jobId);
    const job = await Job.findOne({ _id: jobId });
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

const getJobsByUid = async (req, res, next) => {
  const session = await Job.startSession();
  session.startTransaction();

  try {
    const { uid } = req;
    const user = await User.findOne({ uid });
    console.log('hello');
    if (user) {
      const { _id } = user;
      const jobs = await Job.find({ userId: _id });

      res.status(200).json({ message: 'Jobs fetched successfully', data: jobs });
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
};

export default { createJob, updateJobByJobId, deleteJobByJobId, getAllJobs, getJobByJobId, getJobsByUid };
