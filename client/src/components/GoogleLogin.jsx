import React, { useState, useEffect, useContext } from "react";
import { GoogleLogin } from "react-google-login";
import { useNavigate } from "react-router-dom";
import { gapi } from "gapi-script";
import UserContext from "./UserContext";
import axios from "axios";
import { motion } from "framer-motion";

const Login1 = () => {

  const styleGoogleBtn = {
    background: "white",
    border: "2px solid tomato",
    borderRadius: "20px",
    color: "#3a4c5a",
    padding: "3px 7px 0",
    display: "flex",
    alignItems: "center",
  };

  const [
    { setAuthenticated },
    { setName },
    { setUserId },
    { setEmail },
    { setAvatar },
  ] = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: process.env.REACT_APP_CLIENT_ID,
        scope: "email",
      });
    }

    gapi.load("client:auth2", start);
  }, []);

  const onSuccess = (res) => {
    localStorage.setItem("my-profile", JSON.stringify({ res }));

    const googleProfileObj = JSON.parse(localStorage.getItem("my-profile")).res
      .profileObj;

    const token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId; // Google token

    const configuration = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    if (token !== null) {
      axios
        .get(
          `${process.env.REACT_APP_BE_URL}/api/user/authorize-user`,
          configuration
        )
        .then((res) => {
          setName(res.data.name);
          res.data.avatar
            ? setAvatar(res.data.avatar)
            : setAvatar(googleProfileObj.imageUrl);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

    setAuthenticated(true);
    // setName(googleProfileObj.name);
    setUserId(googleProfileObj.googleId);
    setEmail(googleProfileObj.email);
    //setAvatar(googleProfileObj.imageUrl)

    navigate("/home");
  };
  const onFailure = (response) => {
    console.log("FAILED", response);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login with Google"
        icon={false}
        onSuccess={onSuccess}
        onFailure={onFailure}
        render={(renderProps) => (
          <motion.button 
    whileHover={{ scale: 1.2 }}
          onClick={renderProps.onClick} style={styleGoogleBtn}>
            <i className="fab fa-google"></i> 
            <strong style={{margin:"0 5px"}}>Login with Google</strong> 
          </motion.button>
        )}
      />
    </div>
  );
};
export default Login1;
