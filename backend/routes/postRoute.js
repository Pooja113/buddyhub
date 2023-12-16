import express from 'express'
import postController from '../controllers/postController'

const router = express.Router()

router.post('/post/upload', postController.createPost)
export default router