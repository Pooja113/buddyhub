import express from 'express'
import authVerify from '../middlewares/index.js'
import postController from '../controllers/postController.js'

const router = express.Router()

router.post('/post/create', authVerify, postController.createPost)
router.put('/post/:id', authVerify,  postController.likeDislikePost)
router.delete('/post/:id', authVerify, postController.deletePost)
router.get('/posts', authVerify,  postController.getPostofFollowings)


export default router