import React from 'react'

import { AiOutlineBarChart, AiOutlineBars, AiOutlineUser } from 'react-icons/ai'
import { BiImageAdd } from 'react-icons/bi'
import { RiMessage2Fill } from 'react-icons/ri'
import { NavLink, useNavigate } from 'react-router-dom'

const NavigateContener = () => {
    const Navigate = useNavigate()

  const activeLink = "active"
  const normalLink = "normal"
  return (
    <div>
        <div className="contener">
            <div className="logo">
            <div className="logoleft">
                <h1 onClick={() => Navigate("/")}>N</h1>
            </div> 
            <div>
                <AiOutlineBars />
            </div>
        </div>
            <div className="option">
                <ul>
                    <li>
                        <NavLink to={"/dashboard"} className={({isAction}) => isAction ? activeLink : normalLink }><AiOutlineBarChart /> <span>Dashboard</span> </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/addproduct"} className={({isAction}) => isAction ? activeLink : normalLink }><BiImageAdd /> <span>Add Product</span></NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/account"}  className={({isAction}) => isAction ? activeLink : normalLink }><AiOutlineUser/> <span>Account</span> </NavLink>
                    </li>
                    <li>
                        <NavLink to={"/dashboard/reportbug"}  className={({isAction}) => isAction ? activeLink : normalLink }><RiMessage2Fill /> <span>Report Bug</span> </NavLink>
                    </li>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default NavigateContener