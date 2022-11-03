import React from 'react'
import { useNavigate } from 'react-router-dom'
import imgHomepage from "../../Public/homepageimg.png"

const HomePage = () => {
  const Navigate = useNavigate()  
  return (
    <div className='ContenerHomePage'>
        <div className="content">
            <div className="HomepageLeft">
                <h2>Inventory & Stock Management Solution</h2>
                <p>Inventory system to control and manage proucts in the warehouse in real timeand integrated to make it easier to develop your business.</p>
                <p onClick={() => Navigate("/register")} className='boderText'>Free Trial</p>

                <div className="PostLeft">
                    <div className="contentPost">
                        <p className='contentPostTop'>14k</p>
                        <p className='contentPostBottom'>Brand Owners</p>
                    </div>
                    <div className="contentPost">
                        <p className='contentPostTop'>23k</p>
                        <p className='contentPostBottom'>Active Users</p>
                    </div>
                    <div className="contentPost">
                        <p className='contentPostTop'>500+</p>
                        <p className='contentPostBottom'>Partners</p>
                    </div>
                </div>
            </div>
            <div className="HomepageRight">
                <img src={imgHomepage} alt="img" />
            </div>
        </div>
    </div>
  )
}

export default HomePage