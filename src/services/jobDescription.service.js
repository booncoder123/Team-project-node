// import mongoose from 'mongoose';
// import Post from '../model/post.model.js';
// import User from '../model/user.model.js';
// import Job from '../model/job.model.js';
// import JobDescription from '../model/jobDescription.model.js';

// async function getJobDescriptionByPostId(req, res, next) {
//   const session = await JobDescription.startSession();
//   session.startTransaction();

//   try {
//     const { postId } = req.body;

//     const job = await Job.findOne({ postId });
//     if (job) {
//       const { _id: postId } = job;
//       const JobDescription = await JobDescription.findOne({ postId });
//       res.status(200).json({ message: 'Job description found successfully', data: JobDescription });
//     } else {
//       res.status(404).json({ message: 'Post not found' });
//     }

//     await session.commitTransaction();
//     session.endSession();
//   } catch (error) {
//     await session.commitTransaction();
//     session.endSession();

//     next(error);
//   }
// }
// async function postJobDescription(req, res, next) {
//   const session = await JobDescription.startSession();
//   session.startTransaction();

//   try {
//     const { Company, jobTitle, type, description, postId } = req.body;
//     const newJobDescription = newJobDescription.findOne({ postId });
//     if (newJobDescription) {
//       res.status(404).json({ message: 'Job description alreeady exist on this post id' });
//     } else {
//       const newJobDescription = new JobDescription({
//         Company,
//         jobTitle,
//         type,
//         description,
//         postId,
//       });

//       await newJob.save();
//       res.status(201).json({ message: 'Job description created successfully', data: newJobDescription });
//     }

//     await session.commitTransaction();
//     session.endSession();
//   } catch (error) {
//     await session.commitTransaction();
//     session.endSession();

//     next(error);
//   }
// }

// async function updateJobDescription(req, res, next) {
//   const session = await JobDescription.startSession();
//   session.startTransaction();

//   try {
//     const { Company, jobTitle, type, description, JobDescriptionId } = req.body;
//     const jobDescription = await JobDescription.findOne({ JobDescriptionId });
//     if (jobDescription) {
//       const { _id: JobDescriptionId } = jobDescription;
//       const updateJobDescription = await JobDescription.findOneAndUpdate(
//         { JobDescriptionId },
//         {
//           Company,
//           jobTitle,
//           type,
//           description,
//           JobDescriptionId,
//         },
//         { new: true },
//       );
//       res.status(200).json({ message: 'Job description updated successfully', data: updateJobDescription });
//     } else {
//       res.status(404).json({ message: 'Job description not found' });
//     }

//     await session.commitTransaction();
//     session.endSession();
//   } catch (error) {
//     await session.commitTransaction();
//     session.endSession();

//     next(error);
//   }
// }

// async function deleteJobDescription(req, res, next) {
//   const session = await JobDescription.startSession();
//   session.startTransaction();

//   try {
//     const { JobDescriptionId } = req.body;
//     const jobDescription = await JobDescription.findOne({ JobDescriptionId });
//     if (jobDescription) {
//       const deleteJobDescription = await JobDescription.findOneAndDelete({ JobDescriptionId });
//       res.status(200).json({ message: 'Job description deleted successfully', data: deleteJobDescription });
//     } else {
//       res.status(404).json({ message: 'Job description not found' });
//     }

//     await session.commitTransaction();
//     session.endSession();
//   } catch (error) {
//     await session.commitTransaction();
//     session.endSession();

//     next(error);
//   }
// }

// export default { getJobDescriptionByPostId, postJobDescription, updateJobDescription, deleteJobDescription };
