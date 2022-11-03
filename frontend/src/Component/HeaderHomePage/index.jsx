import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const HeaderHomepage = () => {

  const Navigate = useNavigate()

  const [loginStatus] = useState(false)
  return (
    <div className='MainHeaderHomepage'>
        <div className="leftHomeHeader">
            <h1>N</h1>
        </div>
        <div className="RightHomeHeader">

          {
            loginStatus ? <button className='RightHomeHeader_Dashboard'>Dashboard</button> : <div>
              <button onClick={() => Navigate("/register")} className='RightHomeHeader_Register'>Register</button>
              <button onClick={() => Navigate("/login")} className='RightHomeHeader_Login'>Login</button>
            </div>
          }

        </div>
    </div>
  )
}

export default HeaderHomepage