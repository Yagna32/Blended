import React, { useContext,useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { ShopContext } from '../../Context/ShopContext'
const Breadcrum = (props) => {
    const {product} = props;
    const {setMenu} = useContext(ShopContext)
    useEffect(() => {
      if (product.category === "women") {
          setMenu("Women");
      } else if (product.category === "men") {
          setMenu("Men");
      } else {
          setMenu("Kids");
      }
  }, [product.category, setMenu]);
    // if(product.category !== 'women'){
    //   product.category=product.category+'s'
    // }
    const handleShopClick=()=>{
      setMenu("Shop")
    }
  return (
    <div className='breadcrum'>
        <Link to='/' className='link'><p onClick={handleShopClick}>Shop</p></Link> <img src={arrow_icon} alt="" />
        <Link to={`/${product.category}`} className='link'><p>{product.category}</p></Link> <img src={arrow_icon} alt="" />
        <p>{product.name}</p>
    </div>
  )
}

export default Breadcrum