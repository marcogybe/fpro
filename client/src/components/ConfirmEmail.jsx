import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useState } from 'react'
import { NavLink } from "react-router-dom";

function ConfirmEmail() {

   const { token } = useParams()

   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");

   // Using useEffect hook to make a request to backend to verify the user's token

   useEffect(() => {
      axios.get(`${process.env.REACT_APP_BE_URL}/api/user/confirm-email/${token}`)
         .then(res => {
            setSuccessMessage(res.data)
         }
         )
         .catch(err => setErrorMessage(err.message))
   }, [])

   return (
      
      <div className='container'>
      
         {successMessage && <h1  style={{ color: "darkgreen" }}> Your email has been verified, you can login here:
            <NavLink to="/login"> Here.</NavLink>
         </h1>}
         {errorMessage && <h2 style={{ color: "darkred" }}>{errorMessage}</h2>}
      </div>
   )
}

export default ConfirmEmail
