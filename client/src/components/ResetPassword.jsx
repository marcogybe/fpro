import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../Form.css";
import axios from "axios";

function PasswordReset() {
  const navigate = useNavigate();

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const email = e.target["email"].value;
      const response = await axios.post(
        `${process.env.REACT_APP_BE_URL}/api/user/reset-password`,
        { email }
      );
      setSuccessMessage(response.data);
    } catch (err) {
      setErrorMessage(err.response.data);
    }
  };
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <h2>Reset Password Email sent!</h2>

        {!successMessage && (
          <div>
            <p>
              Please enter the email address you used to create your Gift4U
              account. We will then send you an email to reset your password.
            </p>
            <form className="login-form" onSubmit={submitHandler}>
              <label htmlFor="email">Email address</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="your.email@gmail.com"
                required
              />
              <button type="submit">Reset Password</button>
              <button
                style={{ marginTop: "10px" }}
                className="cancel-btn"
                onClick={() => navigate("/login")}
              >
                Cancel
              </button>
            </form>
            {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          </div>
        )}
  
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
}

export default PasswordReset;
