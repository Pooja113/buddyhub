import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true,"Please enter a name"]
  },
  avatar: {
    public_id: String,
    url: String
  },
  email: {
    type: String,
    required: [true,"Please enter an email"],
    unique: [true, "Email already exists"]
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Password must be at least 8 charaters"],
    select: false,
  },
  posts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  }],
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  followings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  ],
})


const userModel = mongoose.model("User", userSchema);
export default userModel