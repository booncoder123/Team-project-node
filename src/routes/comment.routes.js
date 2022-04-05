import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import CommentSerice from '../services/comment.service.js';

const router = express.Router();
router.post('/create-comment', CommentSerice.createComment);
router.post('/update-comment-by-comment-id', CommentSerice.updateCommentByCommentId);
router.get('/get-all-comments-by-post-id', CommentSerice.getAllCommentsByPostId);
router.delete('/delete-comment-by-comment-id', CommentSerice.deleteCommentByCommentId);
router.delete('/delete-all-comment-by-post-id', CommentSerice.deleteAllCommentByPostId);

export default router;
