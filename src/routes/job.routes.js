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

router.post('/create-job', multer({ dest: 'temp/', fileFilter }).array('images', 10), JobService.createJob);
router.post('/update-job', multer({ dest: 'temp/', fileFilter }).array('images', 10), JobService.updateJobByJobId);
router.delete('/delete-job', JobService.deleteJobByJobId);
router.get('/get-all-jobs', JobService.getAllJobs);
router.get('/get-job-by-job-id', JobService.getJobByJobId);

export default router;
