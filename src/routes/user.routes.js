import express from 'express';
import multer from 'multer';
import authMiddleware from '../middlewares/Auth.middleware.js';




const router = express.Router();

router.get('/user-detail', authMiddleware,(req,res,next)=>{
    console.log("pass")
});



export default router;
