import env from "dotenv"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

import { errorHandler } from "./middleWare/errorMiddleware.js"

import userRoute from "./routers/userRoute.js"

const dotenv = env.config()
const PORT = process.env.PORT || 5000


const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(bodyParser.json())


app.use("/api/users",userRoute)


app.get("/",(req,res) => {
    res.send("Home Page")
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

