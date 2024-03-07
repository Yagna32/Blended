import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
import RelatedProducts from '../Components/RelatedProducts/RelatedProducts'
const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productid} = useParams();
  console.log(productid + " id product choosed")
  const product = all_product.find((e)=>e.id===Number(productid))
  useEffect(()=>{
    window.scrollTo(0,0)
  },[])
  
  return (
    <div className='products'>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
      <RelatedProducts/>
    </div>
  )
}

export default Product