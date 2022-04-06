import express from 'express';
import userRoute from './user.routes.js';
import postRoute from './post.routes.js';
import commentRoute from './comment.routes.js';
import jobRoute from './job.routes.js';

const router = express.Router();

router.use('/user', userRoute);
router.use('/post', postRoute);
router.use('/comment', commentRoute);
router.use('/job', jobRoute);

export default router;
