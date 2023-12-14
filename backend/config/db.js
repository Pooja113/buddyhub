import mongoose from "mongoose";

export const connectionDatabase = () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then((con) => console.log("Database Connected ", con.connection.host))
    .catch((err)=>console.log(err))
 }