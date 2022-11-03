import React from 'react'
import { Outlet } from 'react-router-dom'
import FooterHomepage from '../Component/FooterHomePage'
import HeaderHomepage from '../Component/HeaderHomePage'

import "./HomeLayout.css"

const HomeLayout = () => {
  return (
    <div className='MainHomeLayout'>
        <HeaderHomepage />
            <Outlet />
        <FooterHomepage />
    </div>
  )
}

export default HomeLayout