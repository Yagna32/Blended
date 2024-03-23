import React, { useContext,useEffect } from 'react'
import {Link} from 'react-router-dom'
import './Breadcrum.css'
import arrow_icon from '../Assets/breadcrum_arrow.png'
import { ShopContext } from '../../Context/ShopContext'
import { ShopProductsContext } from '../../Context/ShopProductsContext'
const Breadcrum = (props) => {
    const {setMenu} = useContext(ShopContext)
    const {productid} = props;
    const {products,newCollection,popularProducts} = useContext(ShopProductsContext)
    console.log(productid + " id product choosed")
    const product = products.find((e)=>e.id===Number(productid)) || newCollection.find((e)=>e.id===Number(productid)) || popularProducts.find((e)=>e.id===Number(productid))
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