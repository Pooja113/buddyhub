import express from "express";
import dotenv from 'dotenv'
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'

const app = express();

if(process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env"})
}


//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api', userRoute )
app.use('/api', postRoute)

export default app