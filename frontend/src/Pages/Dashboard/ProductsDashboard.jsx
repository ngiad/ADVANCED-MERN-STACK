import React from 'react'

const ProductsDashboard = ({product,Id}) => {
    const handleClick = (e) => {
        if(e.detail === 2){
            console.log('double click');
        }
    }
  return (
    <tr className='Product' onClick={handleClick}>
        <th>{Id}</th>
        <th>{product.name.toUpperCase()}</th>
        <th><img src={product.image} alt="product" /></th>
        <th>{new Intl.NumberFormat().format(product.price)} đ</th>
        <th>{new Intl.NumberFormat().format(product.amount)}</th>
        <th><p id='description'>{product.describe}</p></th>
    </tr>
  )
}

export default ProductsDashboard