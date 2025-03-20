import React from 'react'
import { Link } from 'react-router-dom'
import './SidebarStyles.css'
function Sidebar() {
  return (
    <div class="nav">
        <ul>
            <li><Link to='/'>Home</Link> </li>
            <li><Link to='/about'>About Us</Link></li>
            <li><Link to='/services'>Services</Link></li>
            <li><Link to='/netbanking/login'>Stocks Login</Link></li>
            <li><Link to='/contact'>Contact Us</Link></li>
        </ul>
    </div>
  )
}

export default Sidebar
