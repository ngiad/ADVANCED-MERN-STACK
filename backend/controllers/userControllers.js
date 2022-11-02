import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs"

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET,{
        expiresIn : "1d"
    })
}


 

export const registerUser = async(req,res,next) => {
    try {
        const {name,email,password,phone} = req.body

        if(!name || !email || !password || !phone){
            res.status(400)
            throw new Error("Please fill in all required fields")
        }

        if(password.length < 6){
            res.status(400)
            throw new Error("Password must be up to 6 characters")
        }

        const userExits = await userModel.findOne({email : email})

        if(userExits){
            res.status(400)
            throw new Error("Email has already been registered")
        }


        const user = await userModel.create({
            name,
            email,
            password,
            phone
        })

        // Genereta Token
        const token = generateToken(user._id)


        // Send HTTP-only cookie
        res.cookie("token", token,{
            path : "/",
            httpOnly : true,
            expires :  new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite : "none",
            secure : true
        })


        if(user){
            const {_id, name , email ,photo , phone , bio} = user
            
            res.status(201).json({
                _id,
                name,
                email,
                photo,
                phone,
                token,
                bio
            })

        }else{
            res.status(400)
            throw new Error("Invalid user data")
        }
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const loginUser = async(req,res,next) => {
    try {
        const { email , password} = req.body

        // Validate Request
        if(!email || !password){
            res.status(400)
            throw new Error("Please add email and pasword")
        }

        const user = await userModel.findOne({email})

        if(!user){
            res.status(400)
            throw new Error("User not found,please signup")
        }

        const passwordIsCorrect = await bcrypt.compare(password,user.password)

        // Genereta Token
        const token = generateToken(user._id)


        // Send HTTP-only cookie
        res.cookie("token", token,{
            path : "/",
            httpOnly : true,
            expires :  new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite : "none",
            secure : true
        })

        if(user && passwordIsCorrect) {
            const {_id, name , email ,photo , phone , bio} = user
            
            res.status(200).json({
                _id,
                name,
                email,
                photo,
                phone,
                token,
                bio
            })
        }else{
            res.status(400)
            throw new Error("Invalid user data")
        }
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const logout = async(req,res,next) => {
    try {
        res.cookie("token", "",{
            path : "/",
            httpOnly : true,
            expires :  new Date(0), 
            sameSite : "none",
            secure : true
        })

        return res.status(200).json({
            message : "Successfully Logged Out"
        })
    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const getUser =  async(req,res,next) => {
    try {
        const user = await userModel.findById(req.user._id)

        if(user){
            const {_id, name , email ,photo , phone , bio} = user
            
            res.status(200).json({
                _id,
                name,
                email,
                photo,
                phone,
                bio
            })
        }else{
            res.status(400)
            throw new Error("User not found")
        }
    } catch (error) {
        res.status(400)
        next(error)
    }
}