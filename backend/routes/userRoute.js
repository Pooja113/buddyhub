import express from 'express'
import userController from '../controllers/userController.js';
import authVerify from '../middlewares/index.js';
const router = express.Router();

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)
router.post('/user/logout', authVerify, userController.logout)
router.put('/user/update/password', authVerify, userController.updatePassword)
router.put('/user/update/profile', authVerify, userController.updateProfile)
router.get('/user/profile/me', authVerify, userController.myProfile)
router.delete('/user/profile', authVerify, userController.deleteProfile)


router.get('/user/follow/:id', authVerify ,userController.followuser)


export default router