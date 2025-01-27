import React, { useState } from "react";
import axios from "axios";
import "./Reg.css"; // Using the same CSS as job seeker registration
import { Link, useNavigate } from "react-router-dom";

const EmployerRegistration = () => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [company_name, setCompanyName] = useState("");
  const [company_website, setCompanyWebsite] = useState("");
  const [company_description, setCompanyDescription] = useState("");
  const [industry_type, setIndustryType] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = (event) => {
    const values = {
      name: name,
      address: address,
      email: email,
      phone_number: phone_number,
      password: password,
      company_name: company_name,
      company_website: company_website,
      company_description: company_description,
      industry_type: industry_type
    };
    
    if (name && email && password && company_name) {
      event.preventDefault();
      axios
        .post("http://localhost:8081/employer/signup", values)
        .then((res) => {
          console.log(res);
          setPopupMessage('Registration Successful!');
          setShowPopup(true);

          setTimeout(() => {
            setShowPopup(false);
            navigate("/login");
          }, 2000);
        })
        .catch((err) => console.log(err));
    } else {
      alert("Please fill in all required fields");
    }
  };

  return (
    <div className="registration-container">
      <div className="registration-wrapper">
        <div className="registration-image">
          {/* Using the same image as job seeker registration */}
        </div>

        <div className="registration-form">
          <form onSubmit={handleRegister}>
            <h2>Employer Registration</h2>
            <input
              type="text"
              value={company_name}
              onChange={(event) => setCompanyName(event.target.value)}
              placeholder="Enter company name"
              required
            />
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Enter contact person name"
              required
            />
            <input
              type="text"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              placeholder="Enter company address"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Enter business email"
              required
            />
            <input
              type="text"
              value={phone_number}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Enter contact number"
              required
            />
            <input
              type="text"
              value={company_website}
              onChange={(event) => setCompanyWebsite(event.target.value)}
              placeholder="Enter company website (optional)"
            />
            <input
              type="text"
              value={industry_type}
              onChange={(event) => setIndustryType(event.target.value)}
              placeholder="Enter industry type"
              required
            />
            <textarea
              value={company_description}
              onChange={(event) => setCompanyDescription(event.target.value)}
              placeholder="Enter company description"
              required
            />
            <div className="password-field">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password (minimum 6 characters)"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
              <button
                type="button"
                className="show-password-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <button type="submit" className="register-button">
              Register as Employer
            </button>
          </form>

          <p>
            Already have an account? <Link to="/">Login</Link>
          </p>
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

export default EmployerRegistration;
