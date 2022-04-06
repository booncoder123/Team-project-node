import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';
import UserService from '../services/user.service.js';

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const router = express.Router();
router.get('/users', UserService.getAllUsers);
router.get('/get-user-detail', authMiddleware, UserService.getUserDetail);
router.get('/get-user-by-id', authMiddleware, UserService.getUserById);
router.post('/create-user', authMiddleware, UserService.createUser);
router.post(
  '/update-user-detail',
  authMiddleware,
  multer({ dest: 'temp/', fileFilter }).single('image'),
  UserService.updateUserDetail,
);
router.delete('/delete-user', authMiddleware, UserService.deleteUser);
router.post(
  '/update-user-profile-image',
  multer({ dest: 'temp/', fileFilter }).single('image', 1),
  UserService.updateUserProfileImage,
);

export default router;
