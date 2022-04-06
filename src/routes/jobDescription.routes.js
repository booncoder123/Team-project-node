import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import JobDescriptionService from '../services/jobDescription.service.js';
import router from './user.routes.js';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.get('/get-job-description-by-job-post-id', JobDescriptionService.getJobDescriptionByPostId);
router.get('/post-job-description', JobDescriptionService.postJobDescription);
router.post('/update-job-description', JobDescriptionService.updateJobDescription);
router.delete('/delete-job-description', JobDescriptionService.deleteJobDescription);
