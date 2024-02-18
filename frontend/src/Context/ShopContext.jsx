import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:4000/api/v1/Product/allProducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_Product(data);console.log(data)})
        if(localStorage.getItem('refresh-token') && localStorage.getItem('access-token')){
            fetch('http://localhost:4000/api/v1/Cart/getCart',{
                method:'GET',
                headers:{
                    Accept:'application/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                    'refresh-token':`${localStorage.getItem('refresh-token')}`,
                    'Content-Type':'application/json'
                }
            })
            .then((res)=>res.json())
            .then((data)=>{if(data){setCartItems(data)};console.log(data)})
            
        }
    
    },[])

    const addToCart = (itemId,price)=>{    
        if(localStorage.getItem('refresh-token')){
            fetch('http://localhost:4000/api/v1/Cart/addtoCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'authorization': `Bearer ${localStorage.getItem('access-token')}`,
                    'refresh-token':`${localStorage.getItem('refresh-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId,"price":price})
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }
    }

    const removeFromCart = (itemId,price)=>{
        if(localStorage.getItem('refresh-token')){
            fetch('http://localhost:4000/api/v1/Cart/removeFromCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
                    'refresh-token':`${localStorage.getItem('refresh-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId,"price":price})
            })
            .then((res)=>{
                return res.json()})
            .then((data)=>{
                if(data.access_token){
                    console.log(data.access_token)
                    localStorage.setItem('access-token',data.access_token)
                }
                if(data.refresh_token){
                    console.log(data.refresh_token)
                    localStorage.setItem('refresh-token',data.refresh_token)
                }
                setCartItems(data.cartData)
            })
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        if(cartItems.length > 0) {
            cartItems.forEach((product)=>{
                totalAmount+=product.price;
            })
        }
        console.log(totalAmount)
        return totalAmount;
    }

    const getQuantity= (itemId) =>{
        let quantity=0;
        cartItems.forEach(product=>{
            if(product.product_id === itemId){
                quantity=quantity+1;
            }
        })
        return quantity;
    }
    const getTotalCartItems = () => {
        let totalItem=0
        if(cartItems.length){
            totalItem = cartItems.length;
        }
        
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,getQuantity};

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider