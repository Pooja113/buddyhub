import express from 'express'
import userController from '../controllers/userController.js';
import authVerify from '../middlewares/index.js';
const router = express.Router();

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.get('/user/follow/:id', authVerify ,userController.followuser)


export default router