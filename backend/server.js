import app from "./app.js";
import { connectionDatabase } from "./config/db.js";

const PORT = process.env.PORT

connectionDatabase();


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})