import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../Form.css";
import axios from "axios";
import Login1 from "./GoogleLogin";
import UserContext from "./UserContext";
import { motion } from "framer-motion";

const Register = () => {
  const [, {setName}] = useContext(UserContext)

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {};

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      user[e.target.elements[i].name] = e.target.elements[i].value;
    }
setName(user.name)
    axios
      .post(`${process.env.REACT_APP_BE_URL}/api/user/signup`, user)
      .then((res) => {
        setSuccessMessage(res.data);
        e.target.reset();
        navigate("/redirect");
      })
      .catch((err) => {
        setErrorMessage(err.request.response);
      });
  };

  return (
    <div className="form-container">
      <div>
        {" "}
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
      <h2>Register</h2>
        <form className="register-form" onSubmit={handleSubmit}>
          <label> Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="full name"
            required
          ></input>

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

          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            placeholder="*********"
            id="confirmPassword"
            name="confirmPassword"
            required
          ></input>

          <motion.button
            className="r-btn"
            whileHover={{ scale: 1.2 }}
            type="submit"
          >
            Register{" "}
          </motion.button>
      
        </form>

        <div>
          {successMessage && !errorMessage ? (
            <p style={{ color: "darkgreen", marginTop: "10px" }}>
              {successMessage}
            </p>
          ) : (
            <p style={{ color: "darkred", marginTop: "10px" }}>
              {errorMessage}
            </p>
          )}
        </div>

        <motion.p whileHover={{ scale: 1.2 }}>
        Already have an account? <br />
        <NavLink to="/login" className="linkin">
          Login
        </NavLink>
      </motion.p>
      
      <div>
        <Login1 />
      </div>
    </div>
  );
};

export default Register;