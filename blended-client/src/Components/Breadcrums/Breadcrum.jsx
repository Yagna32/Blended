import React from 'react'
import {Link} from 'react-router-dom'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
const Breadcrum = (props) => {
    const {product} = props;
  return (
    <div className='breadcrum'>
        <Link to='/' className='link'><p>Shop</p></Link> <img src={arrow_icon} alt="" />
        <Link to='/women' className='link'><p>{product.category}</p></Link> <img src={arrow_icon} alt="" />
        <p>{product.name}</p>
    </div>
  )
}

export default Breadcrum