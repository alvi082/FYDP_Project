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

  const handleLogin = (event) => {
    const values = {
      email: email,
      password: password,
    };
    event.preventDefault();
    axios
      .post("http://localhost:8081/auth/login", values)
      .then((res) => {
        if (res.data.Login) {
          setShowPopup(true);
          setPopupMessage("Login Successful!");

          // Redirect based on user type
          setTimeout(() => {
            if (res.data.userType === 'jobseeker') {
              navigate("/JobSearchDashboard");
            } else {
              navigate("/JobPost");
            }
          }, 2000);
        } else {
          alert("Invalid email or password!");
        }
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-image">
          {/* Add any background image or content here */}
        </div>

        <div className="login-form">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter email id"
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

          <div className="register-options">
            <p>Don't have an account?</p>
            <div className="register-buttons">
              <Link to="/register" className="register-btn jobseeker">
                Register as Job Seeker
              </Link>
              <br />
              <Link to="/employer/register" className="register-btn employer">
                Register as Employer
              </Link>
            </div>
          </div>

          <div className="social-login">
            <span>or login with</span>
            <div className="social-buttons">
              <button className="social-btn google">Google</button>
              <button className="social-btn facebook">Facebook</button>
              <button className="social-btn linkedin">LinkedIn</button>
            </div>
          </div>
        </div>
      </div>

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
