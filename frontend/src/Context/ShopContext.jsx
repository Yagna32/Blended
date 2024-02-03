import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const getDefaulCart = () => {
    let cart = {};
    for(let index=0;index<300+1;index++)
    {
        cart[index] = 0;
    }
    return cart;
}

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems] = useState(getDefaulCart());
    
    useEffect(()=>{
        fetch('http://localhost:4000/allProducts')
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/getCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }
    
    },[])

    const addToCart = (itemId)=>{
        setCartItems((prev)=>({
            ...prev,
            [itemId]: prev[itemId]+1
        }));    
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/addtoCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }

    const removeFromCart = (itemId)=>{
        setCartItems((prev)=>({
            ...prev,
            [itemId]: prev[itemId]-1
        }))
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removeFromCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId})
            })
            .then((res)=>res.json())
            .then((data)=>console.log(data))
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(let item in cartItems) {
            if(cartItems[item] > 0) {
                let itemInfo = all_product.find((product)=>product.id === Number(item))
                totalAmount += itemInfo.new_price * cartItems[item];
            }
            
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartItems) {
            if(cartItems[item] > 0) {
                totalItem+=cartItems[item];
            }
        }
        return totalItem;
    }

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart};

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider