import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import NavigateContener from '../Component/NavigateContener'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./ContenerLayout.css"
import { useSelector } from 'react-redux';
import Requestbase from '../utils/request';

const ContenerLayout = () => {
  const Navigate = useNavigate()

  const user = useSelector((state) => state.Token)

  const handleLoginStatus = async() => {
    try {
      const res = await Requestbase.get("api/users/loggedin",{
        headers : {
          token : user.token
        }
      })
  
      const data = await res.data

      
      if(!data.login){
        return Navigate("/")
      }

    } catch (error) {
      toast.warning("warning")
    }
  }

  useEffect(() => {
    handleLoginStatus()
  },[])

  return (
    <div className='MainContenerLayout'>
        <NavigateContener />
        <div className='contenerContenerLayout'>
          <Outlet />
        </div>
        <ToastContainer />
    </div>
  )
}

export default ContenerLayout