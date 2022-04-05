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
router.get('/get-user-detail', UserService.getUserDetail);
router.get('/get-user-by-id', UserService.getUserById);
router.post('/create-user', multer({ dest: 'temp/', fileFilter }).single('image', 1), UserService.createUser);
router.post('/update-user-detail', UserService.updateUserDetail);
router.delete('/delete-user', UserService.deleteUser);

export default router;
