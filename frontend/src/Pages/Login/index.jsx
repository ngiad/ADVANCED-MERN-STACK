import React, {  useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { BiLogIn } from 'react-icons/bi';
import "./Login.css"
import Requestbase from '../../utils/request';
import { update } from '../../Redux/SliceRedux/user';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const Dispatch = useDispatch()
  const Navigate = useNavigate()  

  const [Loginform,setLoginForm] = useState({
    email : "",
    password : ""
  })

  const [checkformLogin,setCheckformlogin] = useState({
    email : false,
    password : false
  })


  const handlesubmit = async (e) => {
    e.preventDefault()

    if(Loginform.password.length < 6){
        return  setCheckformlogin({...checkformLogin,password : true})
    }

    setCheckformlogin({...checkformLogin,password : false})
    
    try {
        const res = await Requestbase.post("api/users/login",Loginform,{
            headers : {
                withCredentials: true
            }
        })

        const data = await res.data

        Dispatch(update(data));
        if(data) {
          toast.success("Login success")
          Navigate("/dashboard")
          setLoginForm({
            email : "",
            password : ""
          })
        }
    } catch (error) {
      toast.warning(error.response.data.message)
    }
  }

  return (
    <div className='mainLoginFrom'>
        <div className="fromlogin">
            <div className="topLoginForm">
                <p className='iconLogin'><BiLogIn /></p>
                <p className='TextLogin'>Login</p>
            </div>
            <div className="login">
                <form onSubmit={handlesubmit}>
                    <input type="email" value={Loginform.email} onChange={(e) => setLoginForm({...Loginform,email : e.target.value}) } placeholder='Email' />
                    <input type="password" value={Loginform.password} onChange={(e) => setLoginForm({...Loginform,password : e.target.value}) } placeholder='Password' />
                     {
                        checkformLogin.password &&  <p style={{color : "red",margin: "0 0 0 4px"}}>less than 6 characters</p>
                     }  
                    <button>Login</button>
                </form>
            </div>
            <div className="bottomloginForm">
                <p  onClick={() => Navigate("/forgotPassword")} className='bottomloginForm_top'>Forgot Password</p>
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

export default Login