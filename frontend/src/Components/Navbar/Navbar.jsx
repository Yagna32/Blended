import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/logo.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {
    const [menu,setMenu] = useState('Shop')
    const {getTotalCartItems} = useContext(ShopContext)
  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <img src={logo} alt="" />
            <p>SHOPPER</p>
        </div>
        <ul className='nav-menu'>
            <li onClick={()=>{setMenu("Shop")}}> <Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="Shop" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Men")}}><Link to='/Mens' style={{textDecoration:'none'}}>Men</Link>{menu==="Men" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Women")}}><Link to='/Women' style={{textDecoration:'none'}}>Women</Link> {menu==="Women" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Kids")}}><Link to='/Kids' style={{textDecoration:'none'}}>Kids</Link>{menu==="Kids" ? <hr/>:undefined}</li>
        </ul>
        <div className="nav-login-cart">
            <Link to='/Login'>
            <button>Login</button>
            </Link>
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
