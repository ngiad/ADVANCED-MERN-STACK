import env from "dotenv"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"
import cookieParser from "cookie-parser"
import path from "path"
import { fileURLToPath } from 'url'

import { errorHandler } from "./middleWare/errorMiddleware.js"

import userRoute from "./routers/userRoute.js"
import upload from "./muletUpload.js"

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dotenv = env.config()
const PORT = process.env.PORT || 5000


const app = express()

app.use(cors())
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended : false}))
app.use(bodyParser.json())

app.use('/image', express.static(path.join(__dirname, 'image')))


app.use("/api/users",userRoute)


app.get("/",(req,res) => {
    res.send("Home Page")
})

app.post("/single",upload.single("image"),(req,res) =>{
    const url =  req.protocol + '://' + req.get('host')
    res.json({success : true,img : url + '/image/' + req.file.filename })
})



app.use(errorHandler)

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT,() =>{
            console.log("Server Running on port",PORT);
        })
    })
    .catch((e) =>{
        console.log("Server not Runing error on port ",PORT);
    })

