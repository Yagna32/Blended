import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState([]);

    const [cartItems,setCartItems] = useState([]);
    
    useEffect(()=>{
        fetch('http://localhost:4000/api/v1/Product/allProducts')
        .then((res)=>res.json())
        .then((data)=>setAll_Product(data))

        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/v1/Cart/getCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:""
            })
            .then((res)=>res.json())
            .then((data)=>{setCartItems(data);console.log(data)})
            
        }
    
    },[])

    const addToCart = (itemId,price)=>{    
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/v1/Cart/addtoCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId,"price":price})
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
        }
    }

    const removeFromCart = (itemId,price)=>{
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/api/v1/Cart/removeFromCart',{
                method:'POST',
                headers:{
                    Accept:'application/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({"itemId":itemId,"price":price})
            })
            .then((res)=>res.json())
            .then((data)=>setCartItems(data))
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
        let totalItem = cartItems.length;
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