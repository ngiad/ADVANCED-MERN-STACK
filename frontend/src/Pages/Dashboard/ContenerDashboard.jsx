import React from 'react'
import { useState } from 'react'
import { toast } from 'react-toastify'
import ProductsDashboard from './ProductsDashboard'

const ContenerDashboard = ({Products,setProduct,getDataUser}) => {
    const [Search,setSearch] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!Search){
            toast.warning("did not enter the character") 
            return getDataUser()
        }

        const ProductSearch = Products.filter((value) => {
            return value.name.toUpperCase().includes(Search.toUpperCase())
        })

        if(ProductSearch.length === 0){
            toast.warning("No products found") 
            setSearch("")
            return getDataUser()
        }

        setProduct(ProductSearch)
        setSearch("")
    }
    
  return (
    <div className='mainContenerDashboard'> 
        <div className='topContenerDashboard'>
            <h2>Inventory Items</h2>
            <form onSubmit={handleSubmit} >
                <input type="text" value={Search} onChange={(e) => setSearch(e.target.value)} placeholder='search product..' />
            </form>
        </div>
        {
            Products.length === 0 
            ? <p>-- No product found, please add a product...</p> 
            : <div className='customers'>
                <table id="customers">
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Price</th>
                        <th>Amount</th>
                        <th>Description</th>
                    </tr>
                    {
                        Products.map((product,index) => {
                            return <ProductsDashboard Id={index + 1} product={product} key={index} />
                        })
                    }
                </table>
            </div> 
        }
    </div>
  )
}

export default ContenerDashboard