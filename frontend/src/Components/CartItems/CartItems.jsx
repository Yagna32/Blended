import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../Assets/cart_cross_icon.png'

const CartItems = () => {
    const ctxValue = useContext(ShopContext)
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
        {ctxValue.all_product.map((i)=>{
            if(ctxValue.cartItems[i.id]>0){
                return (
            <div key={i.id}>
                <div className="cartitems-format cartitems-format-main">
                    <img src={i.image[0]} className='carticon-product-icon'alt="" />
                    <p>{i.name}</p>
                    <p>${i.new_price}</p>
                    <button className='cartitems-quantity'> {ctxValue.cartItems[i.id]}</button>
                    <p>${i.new_price*ctxValue.cartItems[i.id]}</p>
                    <img className='cartitems-remove-icon'src={remove_icon} onClick={()=>{ctxValue.removeFromCart(i.id)}}alt="" />
                </div>
            </div>
                )
            }
            return null
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
                <button>PROCCED TO CHECKOUT</button>
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