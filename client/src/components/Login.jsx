import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "../Form.css";
import Login1 from "./GoogleLogin";
import UserContext from "./UserContext";
import { motion } from "framer-motion";


const Login = () => {
  const [{ setAuthenticated }, { setName }, { setUserId }, { setEmail }, {setAvatar}] =
    useContext(UserContext);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const credentials = {};

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      credentials[e.target.elements[i].name] = e.target.elements[i].value;
    }

    axios
      .post(`${process.env.REACT_APP_BE_URL}/api/user/login`, credentials)
      .then((res) => {
        localStorage.setItem("my-app-token", JSON.stringify(res.data.token));
        e.target.reset();

        setAuthenticated(true);
        setName(res.data.name);
        setUserId(res.data.userId);
        setEmail(res.data.email);
        res.data.avatar? setAvatar(res.data.avatar) : setAvatar("https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png") 
        navigate("/home");
      })
      .catch((err) => {
        setErrorMessage(err.response.data);
      });
  };

  return (
    <div className="form-container">
        <div>
        <motion.img
          className="logo"
          animate={{
            scale: [1, 1, 1, 1, 1],
            rotate: [0, 0, 180, 180, 0],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.2, 0.5, 0.8, 1],
          }}
          src="/logo-gift.png"
          alt="logo"
        />
      </div>
      <div className="form-wrapper">
        <h2>Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="your.email@gmail.com"
            id="email"
            name="email"
            required
          ></input>
          
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="*********"
            id="password"
            name="password"
            required
          ></input>
         
         <br />

          <motion.button
          className="l-btn"
          whileHover={{ scale: 1.2 }}
          type="submit"
        >
          Login
        </motion.button>
        </form>

        {errorMessage && (
          <p style={{ color: "darkred", marginTop: "10px" }}>{errorMessage}</p>
        )}
        <br />
        <p style={{ color: "Tomato" }}>
          Forgot Password? <NavLink to="/reset-password">Click Here!</NavLink>
        </p>
        
        <motion.p whileHover={{ scale: 1.2 }}>
          Don't have an account? Register {" "}
          <NavLink to="/register" className="linkin"> Here!{" "}</NavLink>
        </motion.p>
      
      </div> <div>
        <Login1 />
      </div>
       
     
    </div>
  );
};

export default Login;
