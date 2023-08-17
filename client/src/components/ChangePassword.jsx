import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const currentPassword = e.target["currentPassword"].value;
    const newPassword = e.target["newPassword"].value;
    const confirmPassword = e.target["confirmPassword"].value;

    if (newPassword !== confirmPassword)
      return setErrorMessage("Password and Confirm Password don't match!");

    let token;
    if (JSON.parse(localStorage.getItem("my-profile"))) {
      token = JSON.parse(localStorage.getItem("my-profile")).res.tokenId;
    } else {
      token = JSON.parse(localStorage.getItem("my-app-token"));
    }

    const configuration = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/api/user/change-password`,
        { currentPassword, newPassword, confirmPassword },
        configuration
      )
      .then((res) => {
        setSuccessMessage(res.data);
        e.target.reset();
      })
      .catch((err) => {
        setErrorMessage(err.request.response);
      });
  };

  return (
    <div className="form-container">
      <div className="form-wrapper">
        {!successMessage && (
          <div>
            <h2>Change your password for your Gift4U account</h2>
            <form className="login-form" onSubmit={submitHandler}>
              <label htmlFor="currentPassword">
                Enter your current password
              </label>
              <input
                type="password"
                id="currentPassword"
                name="currentPassword"
                placeholder="*********"
                required
              />
              <label htmlFor="newPassword">Enter your new password</label>
              <input
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="*********"
                required
              />
              <label htmlFor="confirmPassword">Confirm your new password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                placeholder="*********"
                required
              />
              <button type="submit">Reset Password</button>
            </form>
            {errorMessage && (
              <p style={{ color: "red" }}>
               {/*  Your current password is wrong. If you forgot your current
                password, click here to reset your password:
                <NavLink to="/reset-password"> Here.</NavLink> */}
                {errorMessage}
              </p>
            )}
          </div>
        )}

        {successMessage && (
          <h1 style={{ color: "darkgreen" }}>
            Your password has been changed successfully.
          </h1>
        )}
      </div>
    </div>
  );
}

export default ChangePassword;
