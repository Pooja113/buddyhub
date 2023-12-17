import app from "./app.js";
import { connectionDatabase } from "./config/db.js";
import postRoute from './routes/postRoute.js'
import userRoute from './routes/userRoute.js'


const PORT = process.env.PORT

connectionDatabase();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.use('/api/v1', userRoute )
app.use('/api/v1', postRoute)


app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})