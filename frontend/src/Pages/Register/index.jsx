import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { AiOutlineUserAdd } from 'react-icons/ai';
import "../Login/Login.css"
import { ToastContainer , toast } from 'react-toastify';
import Requestbase from '../../utils/request';
import { useDispatch } from 'react-redux';
import { update } from '../../Redux/SliceRedux/user';

const Register = () => {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()  


  const [RegisterForm,setRegisterForm] = useState({
    name : "",
    password : "",
    email : "",
    confirmPassword : "",
    phone : ""
  })

  const handleSubmit = async(e) => {
    e.preventDefault()
    const {name, password, email, confirmPassword,phone} = RegisterForm

    try {
        if(!name || !password || !email || !confirmPassword || !phone){
            return toast.warning("Enter complete information")
        }

        if(password.length < 6){
            return toast.warning("Enter more than 6 characters")
        }

        if(password !== confirmPassword){
            return toast.warning("Enter wrong confirm Password")
        }

        if(isNaN(phone) || phone.length < 6){
            return toast.warning("Import number and more than 6 characters")
        }

        const res = await Requestbase.post("api/users/register",RegisterForm)
        const data = await res.data

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
                <p className='iconLogin'><AiOutlineUserAdd /></p>
                <p className='TextLogin'>Register</p>
            </div>
            <div className="login">
                <form onSubmit={handleSubmit}>
                    <input value={RegisterForm.name} onChange={(e) =>setRegisterForm({...RegisterForm,name : e.target.value})} type="text" placeholder='Name' />
                    <input value={RegisterForm.email} onChange={(e) =>setRegisterForm({...RegisterForm,email : e.target.value})}  type="email" placeholder='Email' />
                    <input value={RegisterForm.password} onChange={(e) =>setRegisterForm({...RegisterForm,password : e.target.value})}  type="password" placeholder='Password' />
                    <input value={RegisterForm.confirmPassword} onChange={(e) =>setRegisterForm({...RegisterForm,confirmPassword : e.target.value})}  type="password" placeholder='Confirm Password' />
                    <input value={RegisterForm.phone} onChange={(e) =>setRegisterForm({...RegisterForm,phone : e.target.value})}  type="text" placeholder='Phone' />
                    <button>Register</button>
                </form>
            </div>
            <div className="bottomloginForm">
                <p className='bottomloginForm_top'>Forgot Password</p>
                <p className='textbottomloginForm_bottom'>
                    <span onClick={() => Navigate("/")}>Home</span>
                    <span onClick={() => Navigate("/register")}>Don`t have an account ?</span>
                    <span onClick={() => Navigate("/login")}>Login</span>
                </p>
            </div>
        </div>
        <ToastContainer />
    </div>
  )
}

export default Register