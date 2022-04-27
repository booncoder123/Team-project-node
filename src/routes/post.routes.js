import express from 'express';
// import { auth } from 'firebase-admin';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import PostService from '../services/post.service.js';

const router = express.Router();
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

router.post(
  '/create-post',
  authMiddleware,
  multer({ dest: 'temp/', fileFilter }).array('images', 10),
  PostService.createPost,
);
router.post(
  '/update-post',
  authMiddleware,
  multer({ dest: 'temp/', fileFilter }).array('images', 10),
  PostService.updatePost,
);
router.delete('/delete-post', PostService.deletePostByPostId);
// router.get('/get-post-by-post-id', PostService.getPostByPostId);
router.get('/get-all-post', PostService.getAllPost);
router.get('/get-news-post', PostService.getNewsPost);
router.get('/get-disscusion-post', PostService.getDisscusionPost);
router.get('/get-job-post', authMiddleware, PostService.getJobPost);
router.get('/get-post-by-post-id', PostService.getPostByPostId);
router.put('/like',authMiddleware, PostService.putLike);

router.post("/project",authMiddleware, multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.createProject);
router.get("/project", multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.getAllProjects);
router.put("/project",authMiddleware, multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.updateProject);
router.delete("/project",authMiddleware, multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.deleteProject);
router.get("/project/projectId",  PostService.getProjectById);
router.get("/get-disscusion-post-by-uid",authMiddleware, PostService.getDisscusionPostByUid);


//uid
router.get("/discussion",authMiddleware, PostService.getAllDiscussion);
router.get("/news",authMiddleware, PostService.getAllNews);
router.get("/job",authMiddleware, PostService.getAllJob);
router.get("/project",authMiddleware, PostService.getAllProject);




export default router;
