import React from "react";
import { Link } from "react-router-dom"; // Importing Link for navigation
import "./Profile.css";

const Profile = () => {
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
                            <input type="text" defaultValue="Md Ahanaf Mubashshir" />
                        </div>
                        <div className="form-control">
                            <label>Last Name</label>
                            <input type="text" defaultValue="Alvi" />
                        </div>
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input
                            type="email"
                            defaultValue="malvi202262@bscse.uiu.ac.bd"
                        />
                        <span className="valid-indicator">&#10003;</span>
                    </div>
                    <div className="form-control">
                        <label>Address</label>
                        <input type="text" defaultValue="Pallabi,Dhaka" />
                    </div>
                    <div className="form-control">
                        <label>Contact Number</label>
                        <input type="text" defaultValue="01739288997" />
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
