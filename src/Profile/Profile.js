
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import "./Profile.css";
import axios from "axios";

const Profile = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    address: "",
    phone: "",
    password: "",
  });

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios
      .get("http://localhost:8081/job_seeker")
      .then((res) => {
       
        if (res.data.length > 0) {
          const userData = res.data[0]; 
          setValues({
            username: userData.name, 
            email: userData.email,
            address: userData.address,
            phone: userData.phone_number, 
            password: "", 
          });
        } else {
          console.log("No user data found");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  // The rest of your component code...
    return (
        <div className="profile-dashboard">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">AlwaysApply</div>
                <div className="nav-links">
                    <Link to="/JobSearchDashboard"><button className="login-btn">Back</button></Link>
                </div>
            </nav>

            <h2>Edit Profile</h2>
            <div className="profile-form-container">
                <div className="upload-section">
                    <button className="upload-btn">alvi.pdf</button>
                    <div className="profile-img"></div>
                </div>
                <form>
                    <div className="form-group">
                        <div className="form-control">
                            <label>First Name</label>
                            <input type="text" defaultValue= {values.username} />
                        </div>
                        
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            type="email"
                            defaultValue={values.email}
                        />
                        <span className="valid-indicator">&#10003;</span>
                    </div>
                    <div className="form-control">
                        <label>Address</label>
                        <input type="text" defaultValue={values.address} />
                    </div>
                    <div className="form-control">
                        <label>Contact Number</label>
                        <input type="text" defaultValue={values.phone} />
                    </div>
                    <div className="form-group">
                        <div className="form-control">
                            <label>City</label>
                            <select defaultValue="Dhaka">
                                <option>Dhaka</option>
                                <option>Chattogram</option>
                                <option>Khulna</option>
                            </select>
                        </div>
                        <div className="form-control">
                            <label>Country</label>
                            <select defaultValue="Bangladesh">
                                <option>Bangladesh</option>
                                <option>India</option>
                                <option>USA</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input type="password" defaultValue="sbdfbnd65sfdvb s" />
                        <span className="valid-indicator">&#10003;</span>
                    </div>
                    <div className="button-group">
                        <button type="button" className="cancel-btn">Cancel</button>
                        <button type="submit" className="save-btn">Save</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Profile;
