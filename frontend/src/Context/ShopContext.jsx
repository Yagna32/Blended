import React, { createContext, useEffect, useState } from "react";

export const ShopContext = createContext(null);

const ShopContextProvider = (props)=>{

    const [all_product,setAll_Product] = useState([]);
    const [cartItems,setCartItems] = useState([]);

    useEffect(()=>{
        fetch('http://localhost:4000/api/v1/Product/allProducts')
        .then((res)=>res.json())
        .then((data)=>{setAll_Product(data);console.log(data)})
        const fetchData = async () => {
            const tokensValid = await checkTokens();
            if (tokensValid) {
                const cartResponse = await fetch('http://localhost:4000/api/v1/Cart/getCart', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                        'refresh-token': `${localStorage.getItem('refresh-token')}`,
                        'Content-Type': 'application/json'
                    }
                });
                const cartData = await cartResponse.json();
                if (cartData) {
                    setCartItems(cartData);
                }
                console.log(cartData);
            }
        };
    
        fetchData();
            //checkTokens().then(data=>{if(data===true){
            //     fetch('http://localhost:4000/api/v1/Cart/getCart',{
            //     method:'GET',
            //     headers:{
            //         Accept:'application/form-data',
            //         'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
            //         'refresh-token':`${localStorage.getItem('refresh-token')}`,
            //         'Content-Type':'application/json'
            //     }
            // })
            // .then((res)=>res.json())
            // .then((data)=>{if(data){setCartItems(data)};console.log(data)})
            // }})
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const getNewTokens = async (email, refresh_token) => {
        try {
            const response = await fetch(`http://localhost:4000/api/v1/${email}/getTokens`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'refresh-token': refresh_token
                }
            });
    
            if (!response.ok) {
                throw new Error('Failed to get new tokens');
            }
    
            const data = await response.json();
            if (data.success) {
                console.log("New tokens assigned");
                localStorage.setItem('access-token', data.access_token);
                localStorage.setItem('refresh-token', data.refresh_token);
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            console.error('Error while getting new tokens:', error);
            throw error;
        }
    };
    

    const checkTokens = async() =>{
        const access_token = localStorage.getItem('access-token');
        const refresh_token = localStorage.getItem('refresh-token');
        if(!access_token || !refresh_token){
             alert("Please Login First")
             return false;
            }
        const access_payload = JSON.parse(atob(access_token.split('.')[1]))
        const refresh_payload = JSON.parse(atob(refresh_token.split('.')[1]))
        console.log(access_payload.exp-(Date.now()/1000))
        console.log(refresh_payload.exp - (Date.now()/1000))
        if((access_payload.exp - (Date.now()/1000))<1){
            if((refresh_payload.exp - (Date.now()/1000))<1){
                alert('please login first')
                return;
            }
            else {
                console.log('getting new token')
                await getNewTokens(refresh_payload.email, refresh_token);
                return true;
            }
        }
        return true;
    }


    const addToCart = async (itemId, price) => {
        const result = await checkTokens();
        if (result === true) {
            try {
                const response = await fetch('http://localhost:4000/api/v1/Cart/addtoCart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                        'refresh-token': `${localStorage.getItem('refresh-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ itemId: itemId, price: price })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to add item to cart');
                }
    
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error while adding item to cart:', error);
            }
        }
    };
    
    // const addToCart = async(itemId,price)=>{    
    //     const result = await checkTokens()
    //     if(result===true) {
    //     fetch('http://localhost:4000/api/v1/Cart/addtoCart',{
    //         method:'POST',
    //         headers:{
    //             Accept:'application/form-data',
    //             'authorization': `Bearer ${localStorage.getItem('access-token')}`,
    //             'refresh-token':`${localStorage.getItem('refresh-token')}`,
    //             'Content-Type':'application/json'
    //         },
    //         body:JSON.stringify({"itemId":itemId,"price":price})
    //     })
    //     .then((res)=>res.json())
    //     .then((data)=>setCartItems(data)) 
    // }
    // }

    const removeFromCart = async (itemId, price) => {
        const result = await checkTokens();
        if (result === true) {
            try {
                const response = await fetch('http://localhost:4000/api/v1/Cart/removeFromCart', {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                        'refresh-token': `${localStorage.getItem('refresh-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ itemId: itemId, price: price })
                });
    
                if (!response.ok) {
                    throw new Error('Failed to remove item from cart');
                }
    
                const data = await response.json();
                setCartItems(data);
            } catch (error) {
                console.error('Error while removing item from cart:', error);
            }
        }
    };
    
    // const removeFromCart = (itemId,price)=>{
    //     checkTokens().then(data=>{
    //         if(data===true) {
    //             fetch('http://localhost:4000/api/v1/Cart/removeFromCart',{
    //             method:'POST',
    //             headers:{
    //                 Accept:'application/form-data',
    //                 'Authorization': `Bearer ${localStorage.getItem('access-token')}`,
    //                 'refresh-token':`${localStorage.getItem('refresh-token')}`,
    //                 'Content-Type':'application/json'
    //             },
    //             body:JSON.stringify({"itemId":itemId,"price":price})
    //         })
    //         .then((res)=>{
    //             return res.json()})
    //             .then((data)=>{
    //                 setCartItems(data)
    //             })
     
    //         }})
    // }

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