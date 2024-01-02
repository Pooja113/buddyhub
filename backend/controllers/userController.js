import Post from "../models/Post.js";
import User from "../models/User.js";


const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const user = await User.findOne({ email })
      if(user){
        return res.status(400).json({
          success: false,
          message: "Email already exist"
        })
      }

   

      const newUser = await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "sampleid",
          url: "sampleUrl"
        }
      })

      const token = await newUser.generateToken()

      return res.status(201).json({
        success: true,
        newUser,
        token
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email }).select("+password")
      if(!user){
        return res.status(400).json({
          success: false,
          message: "User Does not exist"
        })
      }
      
      const checkPassword = await user.matchPassword(password)
      
      if(!checkPassword) {
        return res.status(401).json({
          success: false,
          message: "Wrong Credentials"
        })
      }
      const token = user.generateToken()
      return res.status(200).json({
        success: true,
        user,
        token
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  logout:  async (req, res) => {
    return res.status(200).json({
      success: true,
      message: "Logged Out !!"
    })
  },

  updatePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body
      if(!oldPassword || !newPassword) {
        return res.status(400).json({
          success: false,
          message: "Please provide oldpassword and newpassword"
        })
      }
      const user = await User.findById(req.user).select("+password")
      const checkPassword = await user.matchPassword(oldPassword)

      console.log(checkPassword)
      if(!checkPassword) {
        return res.status(401).json({
          success: false,
          message: "Wrong Password"
        })
      }

      user.password = newPassword
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Password Updated!!"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  
  updateProfile: async (req, res) => {
    try {
      const { name, email } = req.body
      const user = await User.findById(req.user)
       
      if(name) user.name = name
      if(email) user.email = email
      
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Profile Updated!!"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  myProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user).populate ("posts")
             
      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const user = await User.find({})
             
      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },

  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id).populate("posts")
             
      return res.status(200).json({
        success: true,
        user
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  deleteProfile: async (req, res) => {
    try {
      const user = await User.findById(req.user)
      await Post.deleteMany({ _id: { $in: user.posts } })
      
      await User.updateMany(
        { $or: [{ followings: { $in: [user._id] } }, { followers: { $in: [user._id] } }] },
        { $pull:  {followings: user._id ,  followers: user._id }}
      );
      await User.deleteOne({_id: req.user});
             
      return res.status(200).json({
        success: true,
        message: "User deleted !"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
  },
  followuser: async (req, res) => {
    try {
      const userFollowed = await User.findById(req.params.id)
      const userFollowing = await User.findById(req.user)

      if(!userFollowed){
        return res.status(400).json({
          success: false,
          message: "User Does not exist"
        })
      }
      
      if (userFollowing.followings.includes(req.params.id)) {
        const removeFollowing = userFollowing.followings.indexOf(req.params.id)
        const removeFollowed = userFollowed.followers.indexOf(req.user)

        userFollowing.followings.splice(removeFollowing, 1)
        userFollowed.followers.splice(removeFollowed,1)
        
        await userFollowing.save();
        await userFollowed.save();

        return res.status(200).json({
          success: true,
          message: "User Unfollowed !!"
        })
      }
      
      userFollowing.followings.push(req.params.id)
      userFollowed.followers.push(req.user)

      await userFollowing.save();
      await userFollowed.save();
      return res.status(200).json({
        success: true,
        message: "User Followed !!"
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message
      })
    }
   }
}

export default userController