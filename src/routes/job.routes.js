import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import PostService from '../services/post.service.js';

const router = express.Router();

router.post('/create-post', multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.createPost);
router.post('/update-post', multer({ dest: 'temp/', fileFilter }).array('images', 10), PostService.updatePost);
router.delete('/delete-post', PostService.deletePostByPostId);

export default router;
