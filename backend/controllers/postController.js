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
      const post = await Post.findById(req.params.id)
      if(!post) {
        return res.status(404).json({
          success: false,
          message: "No Post found!"
        })
      }

      if (post.owner.toString() !== req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User"
        })
      }
      const user = await User.findById(req.user)
      
      const indexRemoved = user.posts.indexOf(post._id.toString())
      if (indexRemoved !== -1) {
        user.posts.splice(indexRemoved, 1)
        user.save();
      }

      await Post.deleteOne({_id: req.params.id});

      return res.status(200).json({
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

  

  updatePost : async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if(!post) {
        return res.status(404).json({
          success: false,
          message: "No Post found!"
        })
      }

      if (post.owner.toString() !== req.user) {
        return res.status(401).json({
          success: false,
          message: "Unauthorized User"
        })
      }

      post.caption = req.body.caption
      await post.save()

      return res.status(200).json({
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
  },
  addComment : async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId)
      if(!post) {
        return res.status(404).json({
          success: false,
          message: "No post found"
        })
      }

      const comment = {
        comment: req.body.comment,
        user: req.user
      }

      post.comments.push(comment)
      post.save();
      
      return res.status(200).json({
        success: true,
        message: comment
      })
    
   } catch (error) {
     return res.status(500).json({
       success: false,
       message: error.message
      })
   }
  },
  deleteComment: async (req, res) => {
    try {
      const post = await Post.findById(req.params.id)
      if(!post) {
        return res.status(400).json({
          succes: false,
          message: "Post not found"
        })
      }
    
      if(post.owner.toString() === req.user) {
      
      
      }
             
      return res.status(200).json({
        success: true,
        message: "Comment deleted !"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  getPostofFollowings : async (req, res) => {
    try {
      const user = await User.findById(req.user).populate("followings","posts")
            
      return res.status(200).json({
        success: true,
        following: user.followings
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