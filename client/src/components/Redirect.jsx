import React, { useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import UserContext from "./UserContext";

export default function Redirect() {
   const [, {name}] = useContext(UserContext)

   const navigate = useNavigate()

   useEffect(() => {
      setTimeout(() => {
         navigate('/login')
      }, 10000)
   }, [])
   return (

      <div className='landing'>
         <div className='container'>
            <h1>Thank you {name}! We have sent you an email to complete your registration. You will be redirected to the login page...</h1>
         </div></div>
   )
}