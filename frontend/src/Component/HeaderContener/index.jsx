import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { update } from '../../Redux/SliceRedux/user'
import Requestbase from '../../utils/request'

const HeaderContener = () => {
  const Dispatch = useDispatch()

  const Navigate = useNavigate()

  const User = useSelector((state) => state.Token)

  const logout = async() => {
    try {
      const res = await Requestbase.get("api/users/logout")
      const data = await res.data

      toast.success(data.message)
    } catch (error) {
      toast.warning("warning")
    }
  }

  const handleLogout = () => {
    Navigate("/")
    Dispatch(update({}))
    logout()
  }

  return (
    <div className='MainHeaderContener'>
        <div className="HeaderContenerleft">
            <h1 style={{fontFamily : 'Be Vietnam Pro'}}>Wellcome, <span style={{color : "red",textTransform : "uppercase"}}>{User.name}</span></h1>
        </div>
        <div className="HeaderContenerright">
            <button onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default HeaderContener