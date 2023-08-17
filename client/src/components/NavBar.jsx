import React, { useContext, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import UserContext from "./UserContext";
import "./Navbar.css";

const NavBar = () => {
  const [
    { authenticated },
    { name },
    ,
    ,
    { avatar },
    { logoutHandler },
    { click, setClick },
  ] = useContext(UserContext);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <header className="navbar">
        <div className="container">
        <NavLink to="/home" className="navbar-logo" onClick={closeMobileMenu}>
            <img src="/logo-gift.png" alt="" />
          </NavLink>
          {authenticated && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginLeft: "100px",
              }}
            >
              {avatar && (
                <img
                  src={avatar}
                  alt="User Avatar"
                  style={{
                    width: "50px",
                    height: "50px",
                    borderRadius: "50%",
                    marginRight: "20px",
                  }}
                />
              )}
              <h3 className="welcome">Welcome {name.split(" ")[0]}</h3>
            </div>
          )}
        
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                to="/home"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Home
              </NavLink>
            </li>
            {!authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/register"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  {" "}
                  Register{" "}
                </NavLink>
              </li>
            )}

            {authenticated && (
              <li className="nav-item">
                <NavLink
                  to="/my-profile"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  My Profile
                </NavLink>
              </li>
            )}

            <li className="nav-item">
              <NavLink
                to="/contact"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                Contact Us
              </NavLink>
            </li>
            {authenticated ? (
              <li className="nav-item">
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={logoutHandler}
                >
                  Logout
                </NavLink>
              </li>
            ) : (
              <li className="nav-item">
                {" "}
                <NavLink
                  to="/login"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </header>
    </>
  );
};

export default NavBar;
