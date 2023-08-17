import React, { useState, useEffect } from "react";
import axios from "axios";
import Slides from "./slides";
import VoucherCards from "./VoucherCards";
import "./home.css";
import { NavLink } from "react-router-dom";
import videoGif from "../Cream White Floral Vintage Inspirational Quote Card Landscape (2).mp4";
import videoGif2 from "../bike.mp4";
import videoGif3 from "../music.mp4";
import videoGif4 from "../flower.mp4";
import { Card } from "./Card";

/* style={{border:"2px solid red"}} */
const Home = () => {


  return (
    <div className="home">
   <div>
        <NavLink to="/voucher/search" className="search-bar">
          <div>
            <i className="fa-solid fa-magnifying-glass"> Search your next Gift! </i>
          </div>
        </NavLink>
        
        <div className="open-carousel">
        
        <div className="home-carousel">
          <img className="gift-logo" src="./images/food.png" alt="" />
          <img className="gift-logo" src="./images/beauty.png" alt="" />
          <img className="gift-logo" src="./images/sport.png" alt="" />
          <img className="gift-logo" src="./images/games.png" alt="" />
          <img className="gift-logo" src="./images/style.png" alt="" />
          <img className="gift-logo" src="./images/hobby.png" alt="" />
          <img className="gift-logo" src="./images/garden.png" alt="" />
          <img className="gift-logo" src="./images/cinemas.png" alt="" />
          
        </div>
      </div>
      </div>
      
      
     <br />
      <div className="birth-gift"> 
        <div> Our best Birthday cards </div>
      </div>
      <div>
        <video className="birth-video" src={videoGif} autoPlay loop muted>
          {" "}
        </video>
      </div>
      <div className="list-container">
        <div className="birth-list">
          <div>
            <Card img="./images/birth.png" />
          </div>
          <div>
            <Card img="./images/birth1.png" />
          </div>
          <div>
            <Card img="./images/birth2.png" />
          </div>
          <div>
            <Card img="./images/birth3.png" />
          </div>
          <p className="more-button">
            <i class="fa-solid fa-gifts"></i> See more...
          </p>
        </div>
      </div>
      <hr />
      
      <div>
        <div className="gift-bar">
          {" "}
          <i class="fa-solid fa-crown"> HOT Gifts! </i>
        </div>

        <div className="video-container">
          <div>
            <video className="birth-video2" src={videoGif2} autoPlay loop muted>
              {" "}
            </video>
          </div>
          <div>
            <video className="birth-video3" src={videoGif3} autoPlay loop muted>
              {" "}
            </video>
            <video className="birth-video4" src={videoGif4} autoPlay loop muted>
              {" "}
            </video>
          </div>
        </div>
      </div>
      <br />
     
      <div className="voucher-cont">
      <div ><VoucherCards/></div>
      </div>
      
    
      
  
    
    </div> 

  );
};

export default Home;



