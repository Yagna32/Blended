import React, { Fragment, useEffect, useState } from 'react'
import './ListProduct.css'
import cross_icon from '../../assets/cross_icon.png'
const ListProduct = () => {
  const backendURL=import.meta.env.VITE_BACKEND_URL;

  const [allProducts,setAllProducts] = useState([]);

  const fetchInfo = async()=>{
    await fetch(`${backendURL}/Product/allProducts`)
    .then((res)=>res.json())
    .then((data)=>{setAllProducts(data)})
  }

  useEffect(()=>{
    fetchInfo();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const remove_product = async(id)=>{
    await fetch(`${backendURL}/Product/removeProduct`,{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({id:id})
    })
    await fetchInfo();
  }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className="listproduct-format-main">
          <p>Products</p>
          <p>Title</p>
          <p>Old Price</p>
          <p>New Price</p>
          <p>Category</p>
          <p>Remove</p>
        </div>
        <div className="listproduct-allproducts">
          <hr />
          {allProducts.map((product,i)=>{
            return <Fragment key={i}>
            <div className="listproduct-format-main listproduct-format">
              <img src={product.image[0]} alt="" className="listproduct-product-icon" />
              <p>{product.name}</p>
              <p>${product.old_price}</p>
              <p>${product.new_price}</p>
              <p>{product.category}</p>
              <img onClick={()=>{remove_product(product.id)}} className='listproduct-remove-icon'src={cross_icon} alt="" />
            </div>
            <hr />
            </Fragment>
          })}
        </div>
    </div>
  )
}

export default ListProduct