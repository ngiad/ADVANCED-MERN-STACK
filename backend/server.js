import env from "dotenv"
import express from "express"
import mongoose from "mongoose"
import bodyParser from "body-parser"
import cors from "cors"

const dotenv = env.config()
const PORT = process.env.PORT || 5000


const app = express()


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

