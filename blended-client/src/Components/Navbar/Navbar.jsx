import React, { useContext, useEffect, useRef, useState} from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'
import logo from '../Assets/logo-b.png'
import cart_icon from '../Assets/cart_icon.png'
import { ShopContext } from '../../Context/ShopContext'
import nav_dropdown from '../Assets/nav_dropdown.png'
const Navbar = () => {
    const {getTotalCartItems,menu,setMenu,checkTokens} = useContext(ShopContext)
    const [isLoggedIn,setIsLoggedIn] = useState(false);
    const menuRef = useRef();

    const dropdown_toggle = (e) =>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    useEffect(()=>{
        const checkAuth = async()=>{
            const result = await checkTokens();
            setIsLoggedIn(result);
        }
        checkAuth()
    },[checkTokens])

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            <NavLink to='/' className='nav-link'>
            <img src={logo} alt="" />
            <p>BLENDED</p></NavLink>
        </div>
        <img className='nav-dropdown'src={nav_dropdown} onClick={dropdown_toggle} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("Shop")}}> <Link to='/' style={{textDecoration:'none'}}>Shop</Link>{menu==="Shop" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Men")}}><Link to='/men' style={{textDecoration:'none'}}>Men</Link>{menu==="Men" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Women")}}><Link to='/women' style={{textDecoration:'none'}}>Women</Link> {menu==="Women" ? <hr/>:undefined}</li>
            <li onClick={()=>{setMenu("Kids")}}><Link to='/kid' style={{textDecoration:'none'}}>Kids</Link>{menu==="Kids" ? <hr/>:undefined}</li>
        </ul>
        <div className="nav-login-cart">
            {isLoggedIn 
                ?<button onClick={()=>{localStorage.removeItem('access-token');localStorage.removeItem('refresh-token');window.location.replace('/')}}>Logout</button>
                :<Link to='/Login'><button>Login</button></Link>
            }
            <Link to="/cart"><img src={cart_icon} alt="" /></Link>
            
            <div className="nav-cart-count">{getTotalCartItems()}</div>
        </div>
    </div>
  )
}

export default Navbar
