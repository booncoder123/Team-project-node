import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import CommentSerice from '../services/comment.service.js';

const router = express.Router();
router.post('/create-comment', authMiddleware, CommentSerice.createComment);
router.post('/update-comment-by-comment-id', authMiddleware, CommentSerice.updateCommentByCommentId);
router.get('/get-all-comments-by-post-id', authMiddleware, CommentSerice.getAllCommentsByPostId);
router.delete('/delete-comment-by-comment-id', authMiddleware, CommentSerice.deleteCommentByCommentId);
router.delete('/delete-all-comment-by-post-id', authMiddleware, CommentSerice.deleteAllCommentByPostId);

export default router;
