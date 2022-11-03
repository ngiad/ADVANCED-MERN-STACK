import React from 'react'
import { useNavigate } from 'react-router-dom'

import { BiLogIn } from 'react-icons/bi';
import "./Login.css"

const Login = () => {
  const Navigate = useNavigate()  

  return (
    <div className='mainLoginFrom'>
        <div className="fromlogin">
            <div className="topLoginForm">
                <p className='iconLogin'><BiLogIn /></p>
                <p className='TextLogin'>Login</p>
            </div>
            <div className="login">
                <form>
                    <input type="text" placeholder='Email' />
                    <input type="text" placeholder='Password' />
                    <button>Login</button>
                </form>
            </div>
            <div className="bottomloginForm">
                <p className='bottomloginForm_top'>Forgot Password</p>
                <p className='textbottomloginForm_bottom'>
                    <span onClick={() => Navigate("/")}>Home</span>
                    <span onClick={() => Navigate("/register")}>Don`t have an account ?</span>
                    <span onClick={() => Navigate("/register")}>Register</span>
                </p>
            </div>
        </div>
    </div>
  )
}

export default Login