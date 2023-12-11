import express from "express";
import dotenv from 'dotenv'

const app = express();
dotenv.config({ path: "backend/config/config.env"})

export default app