import React, { useContext } from 'react'
import {Link} from 'react-router-dom'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { ShopContext } from '../../Context/ShopContext'
const Breadcrum = (props) => {
    const {product} = props;
    const {activateMenu} = useContext(ShopContext)
    activateMenu(product.category);
    // if(product.category !== 'women'){
    //   product.category=product.category+'s'
    // }
  return (
    <div className='breadcrum'>
        <Link to='/' className='link'><p>Shop</p></Link> <img src={arrow_icon} alt="" />
        <Link to={`/${product.category}`} className='link'><p>{product.category}</p></Link> <img src={arrow_icon} alt="" />
        <p>{product.name}</p>
    </div>
  )
}

export default Breadcrum