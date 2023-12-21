import mongoose from 'mongoose'
import Post from '../models/Post.js'
import User from '../models/User.js'
const postControllers = {
  createPost : async (req, res) => {
    try {
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: "sampleid",
          url:"sampleurl"
        },
        owner: req.user
      }
      const post = await Post.create(newPostData)
      await User.findOneAndUpdate({
        _id: req.user
      },
        { $set: { posts: post._id } })
      
      return res.status(201).json({
        success: true,
        post
      })
    
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message
      })
   }
  }
}

export default postControllers