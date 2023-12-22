import express from 'express'
import authVerify from '../middlewares/index.js'
import postController from '../controllers/postController.js'

const router = express.Router()

router.post('/post/create', authVerify, postController.createPost)
router.put('/post/:id', authVerify,  postController.likeDislikePost)
//router.delete('/post/create', authVerify,  postController.likeDislikePost)

export default router