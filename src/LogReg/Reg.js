import React, { useState } from 'react';
import './Reg.css';
import { Link, useNavigate } from 'react-router-dom';

const Registration = () => {
    const [showPassword, setShowPassword] = useState(false); // State for password visibility
    const [showPopup, setShowPopup] = useState(false); // State for showing the popup
    const [popupMessage, setPopupMessage] = useState(''); // State for popup message
    const navigate = useNavigate(); // For navigation after successful registration

    const handleRegister = () => {
        // Simulate successful registration with a popup
        setPopupMessage('Registration Successful!');
        setShowPopup(true);

        // Automatically redirect to JobPost page after 2 seconds
        setTimeout(() => {
            setShowPopup(false); // Hide popup before redirection
            navigate('/JobPost'); // Navigate to the JobPost page
        }, 2000);
    };

    return (
        <div className="registration-container">
            <div className="registration-wrapper">
                {/* Left section for the image */}
                <div className="registration-image">
                    {/* Add an image or background here */}
                </div>

                {/* Right section for the form */}
                <div className="registration-form">
                    <h2>Register</h2>
                    <input type="text" placeholder="Enter your full name" />
                    <input type="email" placeholder="Enter your email" />
                    <input type="text" placeholder="Enter your mobile number" />
                    <div className="password-field">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Minimum 6 characters"
                        />
                        <button
                            type="button"
                            className="show-password-btn"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? 'Hide' : 'Show'}
                        </button>
                    </div>
                    <button className="register-button" onClick={handleRegister}>
                        Register
                    </button>
                    <div className="social-register">
                        <span>or sign up with</span>
                        <div className="social-buttons">
                            <button className="social-btn google">Google</button>
                            <button className="social-btn facebook">Facebook</button>
                            <button className="social-btn linkedin">LinkedIn</button>
                        </div>
                    </div>
                    <p>
                        Already have an account? <Link to="/login">Login</Link>
                    </p>
                </div>
            </div>

            {/* Success Popup */}
            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="checkmark">&#10003;</span> {/* Green Tick Icon */}
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Registration;
