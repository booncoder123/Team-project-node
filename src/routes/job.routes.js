import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import JobService from '../services/job.service.js';
const router = express.Router();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  '/create-job',
  authMiddleware,
  multer({ dest: 'temp/', fileFilter }).array('images', 10),
  JobService.createJob,
);
router.post(
  '/update-job',

  multer({ dest: 'temp/', fileFilter }).array('images', 10),
  JobService.updateJobByJobId,
);
router.delete('/delete-job', authMiddleware, JobService.deleteJobByJobId);
router.get('/get-all-jobs', JobService.getAllJobs);
router.get('/get-job-by-job-id', JobService.getJobByJobId);
router.get('/jobs', authMiddleware, JobService.getJobsByUid);

export default router;

async function getAllJob(req, res, next) {
  const session = await Post.startSession();
  session.startTransaction();

  try {
    const user = await User.findOne({ uid: req.uid });
    if (user) {
      const userId = user._id;
      const posts = await Post.find({ postType: 'job', userId: userId });
      res.status(200).json({ message: 'Posts fetched successfully', data: posts });

      await session.commitTransaction();
      session.endSession();
    } else {
      throw new Error('User not found');
    }

    // res.status(200).json({ message: 'Posts fetched successfully', data: posts });

    await session.commitTransaction();
    session.endSession();
  } catch (error) {
    console.log(error);
    await session.commitTransaction();
    session.endSession();
    next(error);
  }
}
