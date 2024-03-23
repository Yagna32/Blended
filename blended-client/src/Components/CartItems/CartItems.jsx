import React, { useContext } from 'react'
import {loadStripe} from '@stripe/stripe-js'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const ctxValue = useContext(ShopContext)
    const backendURL=process.env.REACT_APP_BACKEND_URL; 
    let cart = []
    const formatCart = () => {
        // ctxValue.all_product.map((item1)=>{
        //     if(ctxValue.cartItems.find(item2=>item1.id === item2.product_id)){
        //         cart.push({id:item1.id,name:item1.name,price:item1.new_price,quantity:ctxValue.getQuantity(item1.id)})
        //     }
        //     return null
        // })
        ctxValue.cartItems.forEach((item)=>{
            console.log(ctxValue.cartItems)
            if(!cart.find(obj=>obj.id===item.product_id)) {
                cart.push({id:item.product_id,name:item.name,image:item.image,price:item.price,quantity:ctxValue.getQuantity(item.product_id)})
            }
        })
        console.log(cart)
        return cart;
    }
    formatCart();
    const makePayment = async()=>{
        const stripe = await loadStripe("pk_test_51OnentSCzwG2wuTc2kQvTGvLnptEk7Bfo2MruuwDH9acsYjHm71Mr3VhNyfBegWapAIRUAyPXm3kkluGkjkvYRdZ00k6I8SEKN")
        const tokensValid = await ctxValue.checkTokens();
            if (tokensValid) {
                const paymentResponse = await fetch(`${backendURL}/payment/create-checkout-session`, {
                    method: 'POST',
                    headers: {
                        Accept: 'application/form-data',
                        Authorization: `Bearer ${localStorage.getItem('access-token')}`,
                        'refresh-token': `${localStorage.getItem('refresh-token')}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(formatCart())
                });
                const paymentSession = await paymentResponse.json();
                
                const result = await stripe.redirectToCheckout({
                    sessionId: paymentSession.id
                })
                if(result.error) console.log(result.error)
            }
    }
  return (
    <div className='cartitems'>
        <div className="cartitems-format-main">
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Quantity</p>
            <p>Total</p>
            <p>Remove</p>
        </div>
        <hr />
        {/* {ctxValue.all_product.map((item1)=>{
            if(ctxValue.cartItems.find(item2=>item1.id === item2.product_id)){
                return (
            <div key={item1.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={item1.image[0]} className='carticon-product-icon'alt="" />
                    <p>{item1.name}</p>
                    <p>${item1.new_price}</p>
                    <button className='cartitems-quantity'> {ctxValue.getQuantity(item1.id)}</button>
                    <p>${item1.new_price*ctxValue.getQuantity(item1.id)}</p>
                    <img className='cartitems-remove-icon'src={remove_icon} onClick={()=>{ctxValue.removeFromCart(item1.id,item1.new_price)}}alt="" />
                </div>
            </div>
                )
            }
            return null
        })} */}
        {cart.map((item)=>{
            return (
            <div key={item.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={item.image} className='carticon-product-icon'alt="" />
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <button className='cartitems-quantity'> {ctxValue.getQuantity(item.id)}</button>
                    <p>${item.price*ctxValue.getQuantity(item.id)}</p>
                    <img className='cartitems-remove-icon'src={remove_icon} onClick={()=>{ctxValue.removeFromCart(item.id,item.price)}}alt="" />
                </div>
            </div>)
        })}
        <div className="cartitems-down">
            <div className="cartitems-total">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>subtotal</p>
                        <p>${ctxValue.getTotalCartAmount()}</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>Free</p>
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <h3>Total</h3>
                        <h3>${ctxValue.getTotalCartAmount()}</h3>
                    </div>
                </div>
                <p>card to use : 4000003560000008</p>
                <button onClick={makePayment}>PROCCED TO CHECKOUT</button>
            </div>
            <div className="cartitems-promocode">
                <p>If you have a promo code, Enter it here</p>
                <div className="cartitems-promobox">
                    <input type="text" placeholder='promo code'/>
                    <button>Submit</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default CartItems