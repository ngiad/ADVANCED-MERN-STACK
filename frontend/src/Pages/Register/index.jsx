import React from 'react'
import { useNavigate } from 'react-router-dom'

import { AiOutlineUserAdd } from 'react-icons/ai';
import "../Login/Login.css"

const Register = () => {
  const Navigate = useNavigate()  

  return (
    <div className='mainLoginFrom'>
        <div className="fromlogin">
            <div className="topLoginForm">
                <p className='iconLogin'><AiOutlineUserAdd /></p>
                <p className='TextLogin'>Register</p>
            </div>
            <div className="login">
                <form>
                    <input type="text" placeholder='Name' />
                    <input type="text" placeholder='Email' />
                    <input type="text" placeholder='Password' />
                    <input type="text" placeholder='Confirm Password' />
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
    </div>
  )
}

export default Register