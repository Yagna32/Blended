import React, { useContext } from 'react'
import './RelatedProducts.css'
import Item from '../Item/Item'
// import { ShopContext } from '../../Context/ShopContext'
import { ShopProductsContext } from '../../Context/ShopProductsContext'
const RelatedProducts = () => {
  let {products} = useContext(ShopProductsContext)
  products = products.slice(0,4)
  return (
    <div className='relatedproducts'>
        <h1>Related Products</h1>
        <hr />
        <div className="relatedproducts-item">
            {products.map((item,i)=>{
                return <Item key={i}  id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>
            })}
        </div>
    </div>
  )
}

export default RelatedProducts