import React, { useState, useEffect, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import UserContext from "./UserContext";
import { useLocation } from 'react-router-dom'

const Profile = () => {
  const navigate = useNavigate()
  const [
    ,
    ,
    ,
    ,
    { avatar },
  ] = useContext(UserContext);

  const [errorMessage, setErrorMessage] = useState("");
  const [profile, setProfile] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  let token;

  if (JSON.parse(localStorage.getItem("my-profile"))) {
    token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId; // Google token
  } else {
    token = JSON.parse(localStorage.getItem("my-app-token")); // Our token
  }

  const configuration = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_BE_URL}/api/user/profile-details`,
        configuration
      )
      .then((response) => {
        setProfile(response.data);
      })
      .catch((err) => setErrorMessage(err.request.response));
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();

    const userData = new FormData();

    for (let i = 0; i < e.target.elements.length - 1; i++) {
      if (e.target.elements[i].name === "avatar")
        userData.append("avatar", e.target.elements[i].files[0]);
      else
        userData.append(e.target.elements[i].name, e.target.elements[i].value);
    }

     //console.log(Array.from(userData)); 
     console.log("profile", profile.avatar);
    

    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/api/user/update-profile`,
        userData,
        configuration
      )
      .then((res) => {
        navigate(0)
        setSuccessMessage(res.data);
      })
      .catch((err) => {
        setErrorMessage(err.request.response);
      });
     
  };

  return (
    <React.Fragment>
      <div className="profile-container">
        <div className="form-wrapper">
          <h1>Edit Profile</h1>
          <hr />
          <form onSubmit={handleSubmit}>
            <div>
            <img
            className="avatar-img"
            src= {profile.avatar}
            alt=""
          />
           <input
            className="avatar-input"
            type="file"
            name="avatar"
            accept="image/png, image/jpg, image/jpeg, image/gif"
          />
            </div>
        
          <hr />
            <label htmlFor="name"> Name</label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={profile.name}
              required
            />
            <hr />

            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              defaultValue={profile.location}
            />
            <hr />

            <label htmlFor="interests">Interests</label>
            <input
              type="text"
              id="interests"
              name="interests"
              defaultValue={profile.interests}
            />
            <hr />
            {
              <button type="submit" className="profile-btn">
                Save Changes
              </button>
            }
          </form>
          {JSON.parse(localStorage.getItem("my-app-token")) && 
            <div style={{ marginTop: "20px" }}>
              <NavLink to="/change-password">Change Password {"->"}</NavLink>
            </div>
          }
          <div>
            <br />
            {errorMessage && <p style={{ color: "darkred" }}>{errorMessage}</p>}
            {successMessage && (
              <p style={{ color: "darkgreen" }}>{successMessage}</p>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Profile;
