import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterHomepage from '../Component/FooterHomePage'
import HeaderHomepage from '../Component/HeaderHomePage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import "./HomeLayout.css"

const HomeLayout = () => {
  return (
    <div className='MainHomeLayout'>
        <HeaderHomepage />
            <Outlet />
        <FooterHomepage />
        <ToastContainer />
    </div>
  )
}

export default HomeLayout