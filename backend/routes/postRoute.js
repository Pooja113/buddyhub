import express from 'express'
import postController from '../controllers/postController.js'

const router = express.Router()

router.post('/post/upload', postController.createPost)
export default router