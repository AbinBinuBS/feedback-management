import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import feedbackRouter from './routes/feedbackRouter.js'
import DbConnect from './config/db.js'

const app = express()
DbConnect()
dotenv.config()
const port = process.env.PORT

app.use(cors({
    origin: "*", 
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"] 
}));

app.use(express.json())
app.use(express.urlencoded({extended:true}))


app.use('/',feedbackRouter)




app.listen(port,()=>{
    console.log(`Server is running at port ${port}`)
})