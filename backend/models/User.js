import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

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

userSchema.pre("save", async function(next) {
  if(this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10)
  }
  next()
})

userSchema.methods.matchPassword = async function() {
  await bcrypt.compare(password, this.password)
}

userSchema.methods.generateToken = function() {
  console.log("here")
  return jwt.sign({ _id: this._id, email: this.email }, process.env.JWT_SECRET, {
    expiresIn: '90d'
  })
}

const userModel = mongoose.model("User", userSchema);
export default userModel