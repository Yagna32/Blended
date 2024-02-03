/* eslint-disable no-unused-vars */
import React from 'react'
import './Navbar.css'
import nav_logo from '../../assets/nav-logo.svg'
import navProfile from '../../assets/nav-profile.svg'
const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={nav_logo} className='nav-logo' alt="" />
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar