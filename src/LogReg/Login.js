import React, { useState } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState('');
    const navigate = useNavigate();

    // Function to handle login
    const handleLogin = () => {
        // Here you can add actual login validation if needed
        setShowPopup(true);
        setPopupMessage("Login Successful!");

        // Redirect to the JobSearchDashboard page after 2 seconds
        setTimeout(() => {
            navigate("/JobSearchDashboard");
        }, 2000);
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
                    <input type="text" placeholder="Enter email id / username" />
                    <input type="password" placeholder="Enter password" />
                    <div className="remember-me">
                        <input type="checkbox" id="rememberMe" />
                        <label htmlFor="rememberMe">Remember me</label>
                        <a href="#" className="forgot-password">Forgot Password?</a>
                    </div>
                    <button className="login-button" onClick={handleLogin}>Login</button>

                    <div className="social-login">
                        <span>or login with</span>
                        <div className="social-buttons">
                            <button className="social-btn google">Google</button>
                            <button className="social-btn facebook">Facebook</button>
                            <button className="social-btn linkedin">LinkedIn</button>
                        </div>
                    </div>
                    <p>Don’t have an account? <Link to="/register">Register</Link></p>
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
