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
      
      const checkPassword = user.matchPassword(password)
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
        
        userFollowing.save();
        userFollowed.save();

        return res.status(200).json({
          success: true,
          message: "User Unfollowed !!"
        })
      }
      
      userFollowing.followings.push(req.params.id)
      userFollowed.followers.push(req.user)

      userFollowing.save();
      userFollowed.save();
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