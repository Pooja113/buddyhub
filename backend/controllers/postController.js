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
  },
  deletePost : async (req, res) => {
    try {
      // if (post.owner !== req.user) {
      //   return res.status(401).json({
      //     success: false,
      //     message: "Unauthorized User"
      //   })
      // }
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
  },
  likeDislikePost : async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      console.log("post", post)
      if(!post) {
        return res.status(404).json({
          success: false,
          message: "No post found"
        })
      }

      if (post.likes.includes(req.user)) {
        const indextoRemove = post.likes.indexOf(req.user)
        if(indextoRemove !== -1) {
          post.likes.splice(indextoRemove,1)
        }
        post.save();
        return res.status(200).json({
          success: true,
          message: "Post Unliked"
        })
      }

      post.likes.push(req.user)
      post.save();
      
      return res.status(200).json({
        success: true,
        message: "Post Liked"
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