import React, { useState } from "react";
import axios from "axios";
import "./Reg.css";
import { Link, useNavigate } from "react-router-dom";

const Registration = () => {
  const [name, setName] = useState("");
  const [address, setaddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const [showPopup, setShowPopup] = useState(false); // State for showing the popup
  const [popupMessage, setPopupMessage] = useState(""); // State for popup message
  const navigate = useNavigate(); // For navigation after successful registration

  const handleRegister = (event) => {
    const values = {
      name: name,
      address: address,
      email: email,
      phone_number: phone_number,
      password: password,
    };
    if (name !== "" && email !== null && password !== null) {
      event.preventDefault();
      axios
        .post("http://localhost:8081/signup", values)
        .then((res) => {
          console.log(res);

          setPopupMessage('Registared');
          setShowPopup(true);

          // Automatically redirect to JobPost page after 2 seconds
          setTimeout(() => {
            setShowPopup(false); // Hide popup before redirection
            navigate("/"); // Navigate to the JobPost page
          }, 2000);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Enter all the values");
    }
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
          <form onSubmit={handleRegister}>
            <h2>Register</h2>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              autoComplete="name"
              placeholder="Enter your full name"
            />
            <input
              type="text"
              value={address}
              onChange={(event) => setaddress(event.target.value)}
              autoComplete="address"
              placeholder="Enter your Address"
            />

            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              autoComplete="current-password"
              placeholder="Enter your email"
            />

            <input
              type="text"
              placeholder="Enter your mobile number"
              value={phone_number}
              onChange={(event) => setPhoneNumber(event.target.value)}
              autoComplete="phone_number"
            />

            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Minimum 6 characters"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete="email"
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button className="register-button" type="submit">
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
          </form>
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
