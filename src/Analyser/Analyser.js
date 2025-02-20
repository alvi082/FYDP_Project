import React from "react";
import "./Analyser.css";

function Dashboard() {
    const jobCategories = [
        { title: "UI/UX Designer", vacant: 5, totalCV: 20 },
        { title: "Software Developer", vacant: 10, totalCV: 20 },
        { title: "SQTA Engineer", vacant: 8, totalCV: 20 },
        { title: "ML Engineer", vacant: 12, totalCV: 20 },
    ];

    return (
        <div className="dashboard-container">
            <header>
                <h1>Analyser Dashboard</h1>
                <p>Search for your desired job matching your skills</p>
            </header>
            <div className="summary-cards">
                <div className="card">TOTAL POSITION: 4</div>
                <div className="card">TOTAL VACANCY: 35</div>
                <div className="card">TOTAL CV COUNT: 1250</div>
            </div>
            {jobCategories.map((job, index) => (
                <div key={index} className="job-category">
                    <div className="job-info">
                        <h2>{job.title}</h2>
                        <p>VACANT POSITION: {job.vacant}</p>
                        <p>TOTAL CV COUNT: {job.totalCV}</p>
                    </div>
                    <div className="cv-section">
                        {Array.from({ length: job.totalCV }, (_, i) => (
                            <div key={i} className="cv-item">ShuvoCV.pdf</div>
                        ))}
                        <button className="summarize-button">Analyse</button>
                    </div>
                </div>
            ))}

            {/* Footer Section */}
            <div className="footer">
                <div className="footer-container">
                    <h3>Contact Us</h3>
                    <p>We are here to assist you. Reach out to us for more information or queries.</p>
                    <div className="social-links">
                        <a href="#">Facebook</a>
                        <a href="#">Twitter</a>
                        <a href="#">LinkedIn</a>
                    </div>
                    <div className="footer-bottom">
                        <p>&copy; 2024 CV Management. All rights reserved.</p>
                        <a href="#">Privacy Policy</a> | <a href="#">Terms of Service</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
