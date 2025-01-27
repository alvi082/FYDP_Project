import React, { useState } from "react";
import "./Login.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  // Function to handle login
  const handleLogin = ( event) => {
    const values = {
        email: email,
        password: password,
      };
      event.preventDefault();
      axios
        .post("http://localhost:8081/login", values)
        .then((res) => {
          if (res.data.Login) {
            setShowPopup(true);
            setPopupMessage("Login Successful!");
        
            // Redirect to the JobSearchDashboard page after 2 seconds
            setTimeout(() => {
              navigate("/JobSearchDashboard");
            }, 2000);
          } else alert("No record found!");
  
          console.log(res);
        })
        .catch((err) => console.lot(err));

  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        {/* Left section for the image */}
        <div className="login-image">
          {/* Add any background image or content here */}
        </div>

        {/* Right section for the form */}
        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email id / username"
            />

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <div className="remember-me">
              <input type="checkbox" id="rememberMe" />
              <label htmlFor="rememberMe">Remember me</label>
              <a href="#" className="forgot-password">
                Forgot Password?
              </a>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>

          <div className="social-login">
            <span>or login with</span>
            <div className="social-buttons">
              <button className="social-btn google">Google</button>
              <button className="social-btn facebook">Facebook</button>
              <button className="social-btn linkedin">LinkedIn</button>
            </div>
          </div>
          <p>
            Don’t have an account? <Link to="/register">Register</Link>
          </p>
        </div>
      </div>

      {/* Popup message */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="checkmark">&#10003;</span>
            <p>{popupMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
