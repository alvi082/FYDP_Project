import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <header className="header">
            <div className="logo">
                <h1>AlwaysApply</h1>
            </div>
            <nav className="header-nav">
                <ul>
                    {/*<li><Link to="/jobsearchdash">Job Search</Link></li>*/}
                    {/*<li><Link to="/home">Home</Link></li>*/}
                    <li><Link to="/JobPost">Post</Link></li>
                    <li><Link to="/dashboard">Dashboard</Link></li>
                    <li><Link to="/analyser">Analyzer</Link></li>
                    {/* Add more links as needed */}
                    <li><Link to="/admin">Admin</Link></li>
                </ul>
            </nav>
            <Link to="/Login"><button className="logout-button">Log Out</button></Link>
        </header>
    );
}

export default Header;
