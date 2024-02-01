import React, { useContext } from 'react'
import { ShopContext } from '../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../Components/Breadcrums/Breadcrum'
import ProductDisplay from '../Components/ProductDisplay/ProductDisplay'
const Product = () => {
  const {all_product} = useContext(ShopContext)
  const {productid} = useParams();
  console.log(productid + " id product choosed")
  const product = all_product.find((e)=>e.id===Number(productid))
  return (
    <div className='products'>
      <Breadcrum product={product}/>
      <ProductDisplay product={product}/>
    </div>
  )
}

export default Product