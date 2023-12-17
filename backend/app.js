import express from "express";
import dotenv from 'dotenv'

const app = express();

if(process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "backend/config/config.env"})
}

export default app