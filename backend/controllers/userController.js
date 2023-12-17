import User from "../models/User";

const userController = {
  createUser: async (req, res) => {
    try {
      const { name, email, password } = req.body
      const user = await User.findOne({ email })
      if(user){
        res.status(400).json({
          success: false,
          message: "Email already exist"
        })
      }
      await User.create({
        name,
        email,
        password,
        avatar: {
          public_id: "sampleid",
          url: "sampleUrl"
        }
      })
      res.status(201).json({
        success: true,
        user
      })
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }
}

export default userController