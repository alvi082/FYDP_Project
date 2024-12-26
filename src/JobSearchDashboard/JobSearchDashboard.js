import React, { useState } from "react";
import "./JobSearchDashboard.css";
import { Link } from 'react-router-dom';

function JobSearchDashboard() {
    const [isPopupVisible, setPopupVisible] = useState(false); // State for controlling the popup visibility

    const jobs = [
        {
            id: 1,
            title: "Technical Support Specialist",
            type: "Part-Time",
            salary: "20,000 INR - 25,000 INR",
            company: "Google Inc.",
            location: "New Delhi, India",
            applicants: "10+",
        },
        {
            id: 2,
            title: "Senior UI/UX Designer",
            type: "Full-Time",
            salary: "$30,000 - $55,000",
            company: "Apple",
            location: "Boston, USA",
            applicants: "9+",
        },
        {
            id: 3,
            title: "Front-End Designer",
            type: "Part-Time",
            salary: "15,000 INR - 35,000 INR",
            company: "Intel Corp",
            location: "Bangalore, India",
            applicants: "30+",
        },
        {
            id: 4,
            title: "Senior Automation Engineer",
            type: "Full-Time",
            salary: "$30,000 - $55,000",
            company: "Apple",
            location: "Boston, USA",
            applicants: "9+",
        },
    ];

    // Function to handle apply button click
    const handleApply = () => {
        setPopupVisible(true); // Show the popup
        setTimeout(() => {
            setPopupVisible(false); // Hide the popup after 3 seconds
        }, 3000);
    };

    return (
        <div className="dashboard-container">
            {/* Navbar */}
            <nav className="navbar">
                <div className="logo">AlwaysApply</div>
                <div className="nav-links">
                    <Link to="/profile"><a href="/src/Profile/Profile">Profile</a></Link>
                    <Link to="/Login">
                        <button className="login-btn">Alvi</button>
                    </Link>
                </div>
            </nav>

            {/* Search Section */}
            <section className="search-section">
                <h1>Job Search</h1>
                <p>Search for your desired job matching your skills</p>
                <div className="search-bar">
                    <input type="text" placeholder="Enter Job Title"/>
                    <input type="text" placeholder="Enter Location"/>
                    <input type="text" placeholder="Years of Experience"/>
                    <button className="search-btn">Search</button>
                </div>
            </section>

            {/* Content Section */}
            <div className="content">
                {/* Filters */}
                <aside className="filter">
                    <h3>Filter</h3>
                    <div className="filter-group">
                        <h4>Salary Range</h4>
                        <input type="text" placeholder="Min"/>
                        <input type="text" placeholder="Max"/>
                    </div>
                    <div className="filter-group">
                        <h4>Job Type</h4>
                        <label>
                            <input type="checkbox"/> Full-Time
                        </label>
                        <label>
                            <input type="checkbox"/> Part-Time
                        </label>
                        <label>
                            <input type="checkbox"/> Internship
                        </label>

                        <h4>Work Mode</h4>
                        <label>
                            <input type="checkbox"/> On-Site
                        </label>
                        <label>
                            <input type="checkbox"/> Remote
                        </label>
                        <label>
                            <input type="checkbox"/> Hybrid
                        </label>
                        <h4>Experience Level</h4>
                        <label>
                            <input type="checkbox"/> Fresher/Entry-Level
                        </label>
                        <label>
                            <input type="checkbox"/> Junior
                        </label>
                        <label>
                            <input type="checkbox"/> Mid-Level
                        </label>
                    </div>
                </aside>

                {/* Jobs Section */}
                <main className="jobs-container">
                    <h2>All Jobs ({jobs.length})</h2>
                    <div className="jobs-grid">
                    {jobs.map((job) => (
                            <div key={job.id} className="job-card">
                                <h3>{job.title}</h3>
                                <p>
                                    {job.type} - Salary: {job.salary}
                                </p>
                                <p>Company: {job.company}</p>
                                <p>Location: {job.location}</p>
                                <p>{job.applicants} applicants</p>
                                <div className="job-actions">
                                    <button className="view-btn">View Details</button>
                                    <button className="apply-btn" onClick={handleApply}>Apply Now</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="view-more">
                        <button>View More</button>
                    </div>
                </main>
            </div>

            {/* Pop-up */}
            {isPopupVisible && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="popup-message">
                            <span className="success-icon">✔️</span> Applied Successfully
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
}

export default JobSearchDashboard;
