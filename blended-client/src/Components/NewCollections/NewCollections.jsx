import React, { useContext, useEffect} from 'react'
import './NewCollections.css'
import Item from '../Item/Item'
import { ShopProductsContext } from '../../Context/ShopProductsContext'
const NewCollections = () => {
  const {newCollection,setNewCollection} = useContext(ShopProductsContext)
  const backendURL=process.env.REACT_APP_BACKEND_URL;//process.env.REACT_APP_BACKEND_LOCAL_URL
  useEffect(()=>{
    fetch(`${backendURL}/Product/newCollections`)
    .then((res)=>res.json())
    .then((data)=>setNewCollection(data))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[backendURL])
  return (
    <div className='new-collections'>
        <h1>NEW COLLECTIONS</h1>
        <hr />
        <div className="collections">
            {newCollection.map((item,i)=>{
                return <Item key={i}  id={item.id} name={item.name} image={item.image[0]} new_price={item.new_price} old_price={item.old_price}/>

            })}
        </div>
    </div>
  )
}

export default NewCollections