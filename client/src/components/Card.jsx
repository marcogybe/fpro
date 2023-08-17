import React from "react";
import { NavLink } from "react-router-dom";
import "./card.css"

export const Card = (props) => {
    return (
       <NavLink to={props.link} > <div className="card-container"><img className="card-image" src={props.img} alt="" />
        
       
        </div></NavLink>
    )
}

export default Card;