import React from "react";
import { motion } from "framer-motion";
import "./search.css"

 const VouchersSearch = () => {
  return (
    <div className="search-container" >
        <div className="search-wrapper">
        <h2>Find the perfect gift!</h2>
        <form className="search-form" >
          <label htmlFor="What">What?</label>
          <input
            type="email"
            placeholder="Restaurant,Yoga..."
            
          ></input>
          <br />
          <label htmlFor="password">Where?</label>
          <input
            type="city"
            placeholder="Berlin, Munich..."
          ></input>
          <motion.button
          className="l-btn"
          whileHover={{ scale: 1.2 }}
          type="submit"
        >
          Search
        </motion.button>
          </form>

        

         
          </div>  
          <hr />

          <div className="search-categ">

          <h2> Categories </h2>
        
        <div className="home-categ">
          <img className="gift-logo2" src="/images/food.png" alt="" />
          <img className="gift-logo2" src="/images/beauty.png" alt="" />
          <img className="gift-logo2" src="/images/sport.png" alt="" />
          <img className="gift-logo2" src="/images/games.png" alt="" />
          <img className="gift-logo2" src="/images/style.png" alt="" />
          <img className="gift-logo2" src="/images/hobby.png" alt="" />
          <img className="gift-logo2" src="/images/garden.png" alt="" />
          <img className="gift-logo2" src="/images/cinemas.png" alt="" />
          
        </div>
      </div>
    </div> 
) }


export default VouchersSearch
