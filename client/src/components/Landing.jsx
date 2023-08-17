import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import videoGif from "../Gift4u.mp4";


 const Landing = () => {
   
    const navigate = useNavigate()

    useEffect(() => {
       setTimeout(() => {
          navigate('/home')
       }, 5000)
    }, [])
    return (
 
       <div className='landing'>
          <div className='container'>
             <h1 className="open-msg">Welcome to your GIFT4U Shop</h1>
             <video className="openVideo" src={videoGif} autoPlay loop muted>
          {" "}
        </video>
          </div></div>
    )
}

export default Landing