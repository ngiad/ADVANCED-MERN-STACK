import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";


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
            const {_id, name ,shop, email ,photo , phone , bio} = user
            
            res.status(201).json({
                _id,
                name,
                email,
                photo,
                phone,
                token,
                shop,
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
            const {_id, shop, name , email ,photo , phone , bio} = user
            
            res.status(200).json({
                _id,
                name,
                email,
                photo,
                phone,
                token,
                shop,
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


export const loginStauts = async(req,res,next) =>{
    try {
        const token = req.headers.token

        if(!token){
            return res.json({login : false})
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET)

        if(!verified){
            res.status(400)
            throw new Error("User not found")
        }else{
            res.status(200).json({login : true})
        }

    } catch (error) {
        res.status(400)
        next(error)
    }
}

export const ForgotPassword = async(req,res,next) =>{
    try {
        const user = await userModel.findOne({email : req.body.email})
        if(!user){
            res.status(400)
            throw new Error("User not found")
        }
        const transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
              user: "devwebdainghia@gmail.com",
              pass: "imhfjpfebidvwoet",
            },
          });
        
        const token = generateToken(user._id)

        await transporter.sendMail(
            {
              from: "devwebdainghia@gmail.com",
              to: `${user.email}`,
              subject: "Forgot Password",
              text: `Forgot Password at url ${"http://localhost:3000/forgotPassword/"+token} one day limit`,
            },
            (err) => {
              if (err){
                res.status(400)
                throw new Error("Email not found")
              }
            }
          );  
         res.json({success : true}) 
    } catch (error) {
        res.status(400)
        next(error);
    }
}

export const UpdatePassword = async(req,res,next) =>{
    const { token,password,confirmPassword } = req.body
    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        const user = await userModel.findById({_id : verified.id})

        if(!user){
            res.status(400)
            throw new Error("User not found")
        }

        if(password !== confirmPassword){
            res.status(400)
            throw new Error("Check confirm password")
        }
        

        Object.assign(user,{
            ...user,password : password
        })

        user.save()

        const { name , email ,photo , phone , bio, shop } = user
        
        res.cookie("token", token,{
            path : "/",
            httpOnly : true,
            expires :  new Date(Date.now() + 1000 * 86400), // 1 day
            sameSite : "none",
            secure : true
        })

        res.status(200).json({
            name , email ,photo , phone , bio, token, shop
        })


    } catch (error) {
        res.status(400)
        next(error);
    }
}

export const UpdoadShop = async(req,res,next) => {
    try {
        const user = await userModel.findById({_id : req.user._id})

        if(!user){
            res.status(400)
            throw new Error("User not found")
        }

        Object.assign(user,{
            ...user, shop : [...user.shop,req.body] 
        })

        user.save()

        res.status(200).json({success : true})
    } catch (error) {
        res.status(400)
        next(error)
    }
}