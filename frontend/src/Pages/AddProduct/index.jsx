import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import HeaderContener from '../../Component/HeaderContener'
import Requestbase from '../../utils/request'
import "./AddProduct.css"

const AddProduct = () => {
  const User = useSelector((state) => state.Token)

  const [NewPropduct,setNewProduct] = useState({
    image : "",
    name : "",
    price : "",
    describe : "",
    amount : ""
  })

  const [fileData,setFileData] = useState()
  const [Urlfile, setUrlFile] = useState();

  const fileChange = (e) =>{
    setUrlFile(URL.createObjectURL(e.target.files[0]));
    setFileData(e.target.files[0])
  }

  useEffect(() => {
    return () =>{
      URL.revokeObjectURL(Urlfile)
    }
  },[fileData])

  const handleChangInput =  (e) => {
    setNewProduct({...NewPropduct,[e.target.id] : e.target.value })
  }

  const HandleSubmit = async(e) =>{
    e.preventDefault()

    const {price , amount, describe, name} = NewPropduct

    if(isNaN(amount) && isNaN(price)){
      return toast.warning("Product anmoun & Product price is not number")
    }

    if(!price || !amount || !describe || !name){
      return toast.warning("Fill in all information before saving")
    }

    const File = new FormData()
    File.append("image",fileData)


    try {
      const Url = await Requestbase.post("single",File)
 
      const res = await Requestbase.post("/api/users/createShop",{price , amount, describe, name, image : Url.data.img},{
        headers : {
          token : User.token
        }
      })

      if(res.data.success){
        setNewProduct({
          image : "",
          name : "",
          price : "",
          describe : "",
          amount : ""
        })
        toast.success("Add product done !")
      }

    } catch (error) {
      toast.warning(error.response.data.message)
    }
  }

  return (
    <div className='MainAddProduct'>
      <HeaderContener />
       <h1 className='AddProduct'>Add new product</h1>

       <div className="contenerAddProduct">
        <form onSubmit={HandleSubmit}>
          <label htmlFor='#imgUpload'>
            Product Image
          </label>
          <input onChange={fileChange} onClick={() => setUrlFile("") } type="file" id="imgUpload" />
          {
            Urlfile &&  <img className='srcImage' src={Urlfile} alt="imgUpload" />
          }
          <label htmlFor='#name'>
            Product Name
          </label>
          <input onChange={handleChangInput} type="text" id="name" placeholder='Name Product' />

          <label htmlFor='#price'>
            Product price
          </label>
          <input onChange={handleChangInput} type="text" id="price" placeholder='Price Product' />

          <label htmlFor='#amount'>
            Product Amount
          </label>
          <input onChange={handleChangInput} type="text" id="amount" placeholder='Product Amount'/>

          <label htmlFor='#describe'>
            Product Description
          </label>
          <input onChange={handleChangInput} type="text" id="describe" placeholder='Product Description'/>
          <button>Submit</button>
        </form>
       </div>
    </div>
  )
}

export default AddProduct