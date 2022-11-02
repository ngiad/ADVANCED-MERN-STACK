import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const protect = async (req,res,next) =>{
    try {
        const token = req.headers.token
        console.log(req.headers.cookie.split(";")[0].split("=")[1]);
        if(!token) {
            res.status(400)
            throw new Error("Not authorized, please login")
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById(verified.id).select("-password")

        if(!user){
            res.status(400)
            throw new Error("User not found")
        }
        
        req.user = user
        next()

    } catch (error) {
        res.status(400)
        next(error)
    }
}