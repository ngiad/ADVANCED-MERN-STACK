import bcrypt from "bcryptjs"
import  jwt  from "jsonwebtoken"
import userModel from "../models/userModel.js"

export const protect = async (req,res,next) =>{
    try {
        const token = req.headers.token

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
        req.token = token
        next()

    } catch (error) {
        res.status(400)
        next(error)
    }
}