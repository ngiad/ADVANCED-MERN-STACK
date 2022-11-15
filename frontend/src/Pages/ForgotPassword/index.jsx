import "../Login/Login.css"
import { MdPassword } from 'react-icons/md';
import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from "react-toastify"
import Requestbase from "../../utils/request";


const ForgotPassword = () => {
    const Navigate = useNavigate()

    const [email,setEmail] = useState("")
    const handlesubmit = async(e) => {
        e.preventDefault()
        try {
            const res = await Requestbase.post("/api/users/forgotpassword",{email})
            const data = await res.data

            if(data.success){
                toast.success("Confirm your email")
            }else{
                toast.warning("Check your email again")
            }
        } catch (error) {
            toast.warning(error.response.data.message);
        }
    }
    
  return (
    <div className='mainLoginFrom'>
    <div className="fromlogin">
        <div className="topLoginForm">
            <p className='iconLogin'><MdPassword /></p>
            <p className='TextLogin'>Forgot Password</p>
        </div>
        <div className="login">
            <form onSubmit={handlesubmit}>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder='Email' />
                <button>Submit</button>
            </form>
        </div>
        <div className="bottomloginForm">
            <p onClick={() => Navigate("/forgotPassword")} className='bottomloginForm_top'>Forgot Password</p>
            <p className='textbottomloginForm_bottom'>
                <span onClick={() => Navigate("/")}>Home</span>
                <span onClick={() => Navigate("/register")}>Don`t have an account ?</span>
                <span onClick={() => Navigate("/register")}>Register</span>
            </p>
        </div>
    </div>
    <ToastContainer />
</div>
  )
}

export default ForgotPassword

