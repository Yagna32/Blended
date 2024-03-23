import React, { useContext, useEffect} from 'react'
import './css/ShopCategory.css'
import dropdown_icon from '../Components/Assets/dropdown_icon.png'
import Item from '../Components/Item/Item'
// import { ShopContext } from '../Context/ShopContext'
import { ShopProductsContext } from '../Context/ShopProductsContext'
const ShopCategory = (props) => {
  const {products,setProducts,page,setPage,lastPageFetched,setLastPageFetched} = useContext(ShopProductsContext)
  const backendURL=process.env.REACT_APP_BACKEND_URL;
  useEffect(()=>{
    console.log(lastPageFetched)
    if(lastPageFetched[props.category]===page[props.category]) {
      return ;
    }
    const fetchPages = ()=>{
      fetch(`${backendURL}/Product/${props.category}?page=${page[props.category]}`)
      .then((res)=>res.json())
      .then((data)=>{setProducts((prev)=>[...prev,...data]);setLastPageFetched((prev)=>({...prev,[props.category]:prev[props.category]+1}))})
      .catch((error)=>console.log(error))
    } 
    fetchPages();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[backendURL,props.category,page]) //Intenstionally not passing lastPageFetched so it doesn't get into infinite loop

  const addPage = (category) => {
    setPage((prev)=>({...prev,[category]:prev[category]+1}))
  }
  if (products.length===0) {  
    // Handle loading state here if needed
    return <div>Loading...</div>;
  }

  return (
    <div className='shop-category'>
        <img className="shopcategory-banner"src={props.banner} alt="" />
        <div className="shopcategory-indexSort">
          <p>
            <span>Showing 1-{products.filter(obj => obj.category === props.category).length}</span> out of 36 Products
          </p>
          <div className="shopcategory-sort">
            Sort by <img src={dropdown_icon} alt="" />
          </div>
        </div>
        <div className="shopcategory-products">
            {products && products.map((item,i)=>{
            if(props.category === item.category) {
              return <Item key={i} id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>
            }
            else {
              return null;
            }
          })}
        </div>
        <button className="shopcategory-loadmore"onClick={()=>addPage(props.category)}>Explore More!</button>
    </div>
  )
}

export default ShopCategory