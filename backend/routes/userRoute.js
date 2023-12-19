import express from 'express'
import userController from '../controllers/userController.js';
const router = express.Router();

router.post('/user/register', userController.register)
router.post('/user/login', userController.login)


export default router