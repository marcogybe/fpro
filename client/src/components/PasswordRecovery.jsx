import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

function PasswordRecovery() {
  const { email, token } = useParams();


  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const submitHandler = async (e) => {
    e.preventDefault();

    const password = e.target["password"].value;
    const confirmPassword = e.target["confirmPassword"].value;

    if (password !== confirmPassword)
      return setErrorMessage("Password and Confirm Password don't match!");

    const configuration = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .put(
        `${process.env.REACT_APP_BE_URL}/api/user/reset-password`,
        { password, confirmPassword, email },
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
        {!successMessage && <div>
            <h2>Set a new password for your Gift4U account</h2>
<form className="login-form" onSubmit={submitHandler}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="*********"
            required
          />
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="*********"
            required
          />
          <button type="submit">Reset Password</button>
        </form>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
</div>}

        {successMessage && (
          <h1 style={{ color: "darkgreen" }}>
            {" "}
            Your password has been changed successfully, you can login here with
            the new password:
            <NavLink to="/login"> Here.</NavLink>
          </h1>
        )}

      </div>
    </div>
  );
}

export default PasswordRecovery;
