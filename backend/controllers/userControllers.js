import userModel from "../models/userModel.js";

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

        if(user){
            const {_id, name , email ,photo , phone , bio} = user
            
            res.status(201).json({
                _id,
                name,
                email,
                photo,
                phone,
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