import Post from '../models/Post.js'

const postControllers = {
  createPost : async (req, res) => {
    try {
      const newPostData = {
        caption: req.body.caption,
        image: {
          public_id: "sampleid",
          url:"sampleurl"
        },
        owner: req.user._id
      }
      const newPost = await Post.create(newPostData)
      return res.status(201).json({
        success: true,
        post: newPost
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