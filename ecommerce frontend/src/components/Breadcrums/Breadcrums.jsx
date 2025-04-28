import React from 'react'
import './Breadcrums.css'
const Breadcrums = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
      HOME <p>>></p> SHOP <p>>></p> {product.category} <p>>></p> {product.name}
    </div>
  )
}

export default Breadcrums
