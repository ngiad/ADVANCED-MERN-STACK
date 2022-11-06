import "../Login/Login.css"

import React, { useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { ToastContainer,toast } from "react-toastify"
import { MdPassword } from "react-icons/md"
import Requestbase from "../../utils/request"
import { useDispatch } from "react-redux"
import { update } from "../../Redux/SliceRedux/user"

const UpdatePassword = () => {
  const Navigate = useNavigate()
  const Dispatch = useDispatch()
  const { token } = useParams()

  const [UpdataPassword,setUpdatePassword] = useState({
    password : "",
    confirmPassword : ""
  })
  
  const handleSubmit = async(e) => {
    e.preventDefault()
    try {
        const res = await Requestbase.post("api/users/updatepassword",{...UpdataPassword,token})
        const data = await res.data

        toast.success("Update Password done")
        Dispatch(update(data))
        Navigate("/dashboard")
    } catch (error) {
        toast.warning(error.response.data.message)
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
            <form onSubmit={handleSubmit}>
                <input value={UpdataPassword.password} onChange={(e) => setUpdatePassword({...UpdataPassword,password :e.target.value })} type="password"  placeholder='Password' />
                <input value={UpdataPassword.confirmPassword} onChange={(e) => setUpdatePassword({...UpdataPassword,confirmPassword :e.target.value })} type="password"  placeholder='Confirm Password' />
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

export default UpdatePassword