import React from 'react'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        <p>HOME</p> <img src={arrow_icon} alt="" />
        <p>SHOP</p> <img src={arrow_icon} alt="" />
        <p>{product.category}</p> <img src={arrow_icon} alt="" />
        <p>{product.name}</p>
    </div>
  )
}

export default Breadcrum