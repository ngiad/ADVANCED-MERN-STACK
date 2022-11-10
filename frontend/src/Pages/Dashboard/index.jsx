import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import HeaderContener from '../../Component/HeaderContener'
import { update } from '../../Redux/SliceRedux/user'
import Requestbase from '../../utils/request'
import ContenerDashboard from './ContenerDashboard'
import "./Dashboard.css"
import PaginationProducts from './PaginationProducts'

const Dashboard = () => {
  const User = useSelector((state) => state.Token)
  const Dispatch = useDispatch()

  const [Products,setProduct] = useState([])
  
  const getDataUser = async() =>{
    try {
      const res = await Requestbase.get("api/users/getuser",{
        headers : {
          token : User.token
        }
      })

      const data = await res.data

      Dispatch(update(data))
      setProduct(data.shop)
    } catch (error) {
      toast.warning(error.response.data.message)
    }
  }


  useEffect(() => {
    getDataUser()
  },[])


  return (
    <div>
      <HeaderContener />
      <div className="DashboardContent">
          <div className="topDashboardContent">
            <h2>Inventory Stats</h2>
            <div className="info-summary">
              <button>Total Products ({User.shop.reduce((total,num) =>  total + num.amount,0)})</button>
              <button>Total Store Value ({User.shop.reduce((total,num) =>  total + num.price,0)} đ)</button>
              <button>Out of Stock ({User.shop.filter((product) => product.amount === 0).length})</button>
              <button>All Categories ({User.shop.length})</button>
            </div>
          </div>
          <ContenerDashboard Products={Products} getDataUser={getDataUser} setProduct={setProduct} />
          <PaginationProducts shop={User.shop} setProduct={setProduct} />
      </div>
    </div>
  )
}

export default Dashboard