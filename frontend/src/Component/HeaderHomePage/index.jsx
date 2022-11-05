import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import Requestbase from '../../utils/request'

const HeaderHomepage = () => {
  const Navigate = useNavigate()
  const token = useSelector((state) => state.Token)
  const [loginStatus,setLoginStatus] = useState(false)


  const handleLoginStatus = async() => {
    try {
      const res = await Requestbase.get("api/users/loggedin",{
        headers : {
          token : token.token
        }
      })
  
      const data = await res.data
      setLoginStatus(data.login)
    } catch (error) {
      toast.warning("warning")
    }
  }

  useEffect(() =>{
    handleLoginStatus()
  },[])

  return (
    <div className='MainHeaderHomepage'>
        <div className="leftHomeHeader">
            <h1>N</h1>
        </div>
        <div className="RightHomeHeader">
          {
            loginStatus ? <button onClick={() => Navigate("/dashboard")} className='RightHomeHeader_Dashboard'>Dashboard</button> : <div>
              <button onClick={() => Navigate("/register")} className='RightHomeHeader_Register'>Register</button>
              <button onClick={() => Navigate("/login")} className='RightHomeHeader_Login'>Login</button>
            </div>
          }

        </div>
    </div>
  )
}

export default HeaderHomepage