import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import HeaderContener from '../../Component/HeaderContener'
import "./Account.css"
import EditAccount from './EditAccount'

const Account = () => {
  const User = useSelector((state) => state.Token)

  const [CheckEditProfile,setCheckEditProfile] = useState(false)

  const handleCheckEdit = () =>{
    setCheckEditProfile(!CheckEditProfile)
  }

  return (
    <div>
      <HeaderContener />
      <div  className='MainAccount'>
        <div className="contenerAccount shadow-drop-center">
          <div className="topAccount">
            <img src={User.photo} alt="avatar" />
            <div className='topAccountContent'>
              <p>Name  : {User.name}</p>
              <p>Email : {User.email}</p>
              <p>Phone : {User.phone}</p>
            </div>
          </div>
          <div className="bottomAccount">
            <p>{User.bio}</p>
          </div>
          <div className="buttonAccount">
            <button onClick={handleCheckEdit}>Edit Profile</button>
          </div>
        </div>
        {
          CheckEditProfile && <EditAccount handleCheckEdit={handleCheckEdit} />
        }
      </div>
    </div>
  )
}

export default Account