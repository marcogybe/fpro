import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
/* import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; */


const Contact = () => {

   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");
  

   return (<>

      <div>
      <h2 className="contact-cont">Contact</h2>
            <hr />
            <h3 className="email-cont">E-MAIL</h3>
            <p className="info-cont">info@Gift4U.com</p>
            <h3 className="social-cont">Social Network</h3>
            {/* <FontAwesomeIcon icon="fa-brands fa-facebook" />  */}     <a
              className="facebook"
              href="http://https://www.linkedin.com/in/joseph-olumuyiwa-3911371/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <br />
           {/*  <FontAwesomeIcon icon="fa-brands fa-github" /> */}      <a
              className="github"
              href="https://github.com/joeyolumuyiwa"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </a>
      
            <div>
              <div className="container mt-3 contactContent">
                <h1 className="text-center">Contact Me</h1>
      
                <div className="row mt-4">
                  <div className="col-lg-6">
                    <div style={{maxWidth:"100%",overflow:"hidden",color:"red",width:"500px",height:"500px"}}>
                      <div
                        id="embedmap-canvas"
                        style={{height:"100%", width:"100%",maxWidth:"100%"}}
                      >
                        <iframe
                          style={{height:"100%",width:"100%",border:"0"}}
                          frameborder="0"
                          src="https://www.google.com/maps/embed/v1/place?q=new+york&key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8"
                        ></iframe>
                      </div>
                      <a
                        className="googlemaps-html"
                        href="https://www.embed-map.com"
                        id="get-data-forembedmap"
                      >
                        https://www.embed-map.com
                      </a>
                      
                    </div>
                  </div>
      
                  <div className="col-lg-6">
      
                  <form>
                              <input type="text" className="form-control form-control-lg" placeholder="Name" />
                              <input type="email" className="form-control mt-3" placeholder="Email" />
                              <input type="text" className="form-control mt-3" placeholder="Subject" />
                              <div className="mb-3 mt-3">
                                  <textarea className="form-control" rows="5" id="comment" name="text" placeholder="Project Details" />
                              </div>
                    <button type="button" className="btn btn-success mt-3">
                      Contact Me
                    </button>
                    </form>
                  </div>
                </div>
              </div>
            </div></div>
           
         </>);
      };

export default Contact;
