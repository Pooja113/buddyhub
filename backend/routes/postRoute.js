import express from 'express'
import authVerify from '../middlewares/index.js'
import postController from '../controllers/postController.js'

const router = express.Router()

router.post('/post/upload', authVerify,  postController.createPost)
export default router