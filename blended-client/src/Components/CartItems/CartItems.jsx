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
        {ctxValue.all_product.map((item1)=>{
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