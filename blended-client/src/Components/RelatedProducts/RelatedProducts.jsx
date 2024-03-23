import React, { useContext } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
// import { ShopContext } from '../../Context/ShopContext'
import { ShopProductsContext } from '../../Context/ShopProductsContext'
const RelatedProducts = () => {
  const {popularProducts} = useContext(ShopProductsContext)
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {popularProducts.map((item,i)=>{
                return <Item key={i}  id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts