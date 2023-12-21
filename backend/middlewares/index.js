import jwt from 'jsonwebtoken';

const authVerify = async (req, res, next) => {
  try {
    const {token} = req.headers
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "You will have to login first!"
      })
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decode._id
    console.log(decode)
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
     })
  }
}
export default authVerify