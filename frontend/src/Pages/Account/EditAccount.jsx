import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

const EditAccount = ({handleCheckEdit}) => {
    const User = useSelector((state) => state.Token)
    const [EditProfile,setEditProfile] = useState({})
    const [FileAvatar,setFileAvatar] = useState(undefined)

    useEffect(() => {
        setEditProfile(User)
    },[])

    const handleChangeInput = (e) => {
        setEditProfile({EditProfile,[e.target.id] : e.target.value})
    }

    const HandleChangeFile = (e) => {
        if(!e.target.files[0]){
            URL.revokeObjectURL(EditProfile.photo)
            setEditProfile({...EditProfile,photo : User.photo})
            setFileAvatar(undefined)
            return 
        }

        if(!e.target.files[0].type.includes("image")){
            return toast.warning("File support jpeg, png, jpg")
        }

        setFileAvatar(e.target.files[0])
        setEditProfile({...EditProfile,photo : URL.createObjectURL(e.target.files[0])})
    }

    const HandleSubmit = async(e) => {
        e.preventDefault()
        console.log(EditProfile)
    }

  return (
    <div className='EditAccount shadow-drop-center'>
        <h2>Edit Profile</h2>
        <div className='EditAccountContener'>
            <form onSubmit={HandleSubmit}>
                <label htmlFor="photo">Image Profile</label>
                <input onChange={HandleChangeFile} type="file" id='photo' />
                <label htmlFor="">Name Profile</label>
                <input onChange={handleChangeInput} value={EditProfile.name} type="text" />
                <label htmlFor="">Email Profile</label>
                <input onChange={handleChangeInput} value={EditProfile.email} type="text" />
                <label htmlFor="">Phone Profile</label>
                <input onChange={handleChangeInput} value={EditProfile.phone} type="text" />
                <label htmlFor="">Bio Profile</label>
                <input onChange={handleChangeInput} value={EditProfile.bio} type="text" />
            </form>
            <img src={EditProfile.photo} alt="EditProfile avatar" />
        </div>
        <button className='constant' onClick={handleCheckEdit}>Constant</button>
        <button onClick={HandleSubmit} className='saveProfile'>Save</button>
    </div>
  )
}

export default EditAccount