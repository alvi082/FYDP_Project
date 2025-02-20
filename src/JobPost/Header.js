import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import axios from "axios";

function Header() {
    const [companyName, setCompanyName] = useState("");

    // Ensure credentials are sent with every request
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/auth/employer/dashboard");
                
                if (response.data && response.data.company_name) {
                    setCompanyName(response.data.company_name); 
                } else {
                    console.log("No user data found");
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        fetchSessionData();
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <h1>{companyName || "AlwaysApply"}</h1> {/* Fallback to "AlwaysApply" if companyName is not available */}
            </div>
            <nav className="header-nav">
                <ul>
                    <li><Link to="/JobPost">Post</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                </ul>
            </nav>
            <Link to="/Login"><button className="logout-button">Log Out</button></Link>
        </header>
    );
}

export default Header;