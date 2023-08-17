import React from 'react'
import { NavLink } from "react-router-dom";
import "./Footer.css"

const Footer = () => {
  return (
    <div>
        <footer>
            <h3 className='design'>
           DCI Project 2023 <q>Gift4u Shop</q>    
            </h3>
            <NavLink
                to="/contact"
                className="contact"
              >
                Contact Us
              </NavLink>
        </footer>
    </div>
  )
}

export default Footer
