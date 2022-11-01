import mongoose from "mongoose";

const userShema = mongoose.Schema({
    name : {
        type : String,
        required : [true, "Please add your name"]
    },
    email : {
        type :  String,
        required : [true , "Please add your email"],
        unique : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a  valid emaial"
        ]
    },
    password : {
        type :  String,
        require : [true, "Please add your password"],
        minlength : [6, " Password must be up to 6 characters"],
        maxlength : [25," Password must not be up more than 25 characters"]
    },
    photo : {
        type :  String,
        require : [true, "Please add your photo"],
        default : "https://i.ibb.Co/4pDNDk1/avatar.png"
    },
    phone : {
        type :  String,
        required : [true, "Please add your phone"]
    },
    bio : {
        type :  String,
        maxlength : [200," Bio must not be up more than 200 characters"],
        default : "Anh bạn đang lười quá ..."
    }
},{
    timestamps :  true
})

export default mongoose.model("useradvanced",userShema)