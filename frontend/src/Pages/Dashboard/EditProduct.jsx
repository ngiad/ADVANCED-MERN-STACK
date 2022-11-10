import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const EditProduct = ({product,handleChange}) => {
  const [Edit,setEdit] = useState({})

  const [fileData,setFileData] = useState()
  const [Urlfile, setUrlFile] = useState(product.image)

  const fileChange = (e) =>{
    if(!e.target.files[0]){
      return
    }

    if(!e.target.files[0].type.includes("image")){
      return toast.warning("File support jpeg, png, jpg")
    }

    setUrlFile(URL.createObjectURL(e.target.files[0]));

    setFileData(e.target.files[0])
  }
  
  useEffect(() => {
    setEdit(product)
  },[])

  const handleChangInput =  (e) => {
    setEdit({...Edit,[e.target.id] : e.target.value })
  }

  const handleClick =  () => {
    setEdit({})
    handleChange()
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    console.log(Edit._id)
    console.log(fileData)
  }

  return (
    <div className='EditProduct shadow-drop-center'>
      <button className='closeEditProduct' onClick={handleClick}>X</button>
        <form onSubmit={handleSubmit}>
          <label htmlFor='#imgUpload'>
            Product Image
          </label>
          <input onChange={fileChange} onClick={() =>{
            setFileData(undefined)
            setUrlFile(product.image)
          }} type="file" id="imgUpload" />
          {
            Urlfile &&  <img className='srcImage' src={Urlfile} alt="imgUpload" />
          }
          <label htmlFor='#name'>
            Product Name
          </label>
          <input onChange={handleChangInput} value={Edit.name} type="text" id="name" placeholder='Name Product' />

          <label htmlFor='#price'>
            Product price
          </label>
          <input onChange={handleChangInput} value={Edit.price}  type="text" id="price" placeholder='Price Product' />

          <label htmlFor='#amount'>
            Product Amount
          </label>
          <input onChange={handleChangInput} type="text" value={Edit.amount} id="amount" placeholder='Product Amount'/>

          <label htmlFor='#describe'>
            Product Description
          </label>
          <input onChange={handleChangInput} type="text" value={Edit.describe} id="describe" placeholder='Product Description'/>
          <div className="buttonFormEdit">
            <button>Save</button>
            <button>Delete</button>
          </div>
        </form>
    </div>
  )
}

export default EditProduct