import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.jpg'
import navProfile from '../../assets/profile_logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={navlogo} alt="" className="nav-logo" />
      <div className="shopper">SHOPPER  ADMIN</div>
      <img src={navProfile} alt="" className="nav-profile" /> 
    </div>
  )
}

export default Navbar
