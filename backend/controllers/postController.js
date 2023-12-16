import Post from '../models/Post'

export default postControllers = {
  createPost : async (req, res) => {
    try {
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: "hjdhf",
          url:"fndjfjd"
        },
        owner: req.user._id
      }
      const newPost = await Post.create(newPostData)

      res.status(201).json({
        success: true,
        post: newPost
      })
    
   } catch (error) {
     res.status(500).json({
       success: false,
       message: error.message
      })
   }
  }
}