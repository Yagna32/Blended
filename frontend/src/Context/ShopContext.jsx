import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/api/v1/Product/allProducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_Product(data);console.log(data)})

            if(checkTokens()===true){
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getNewTokens = (email)=>{
        fetch(`http://localhost:4000/api/v1/${email}/getTokens`,{
            method: 'GET',
            headers:{
              Accept:'application/json',
              'Content-Type':'application/json'
            }
            })
            .then((res)=>res.json())
            .then((data)=>{
                if(data.success)
                {
                    console.log("New tokens assigned")
                    localStorage.setItem('access-token',data.access_token)
                    localStorage.setItem('refresh-token',data.refresh_token)
                }
                else {
                    console.log(data.error);
                }
                return data.success;
                })
    }

    const checkTokens = () =>{
        const access_token = localStorage.getItem('access-token');
        const refresh_token = localStorage.getItem('refresh-token');
        if(!access_token || !refresh_token){
             alert("Please Login First")
             return false;
            }
        const access_payload = JSON.parse(atob(access_token.split('.')[1]))
        const refresh_payload = JSON.parse(atob(refresh_token.split('.')[1]))
        if((access_payload.exp - (Date.now()/1000))<10){
            if((refresh_payload.exp - (Date.now()/1000))<1){
                window.location.replace('/Login');
            }
            else {
                getNewTokens(refresh_payload.email);
                return true;
            }
        }
        return true
    }

    const addToCart = (itemId,price)=>{    
       if(checkTokens()===true) {
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
        if(checkTokens()===true) {
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
                    setCartItems(data)
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

    const contextValue = {getTotalCartItems,getTotalCartAmount,all_product,cartItems,addToCart,removeFromCart,getQuantity,checkTokens};

    return (
        <ShopContext.Provider value={contextValue} >
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider