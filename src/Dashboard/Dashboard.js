import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Dashboard.css";

function Dashboard() {
    const [jobCategories, setJobCategories] = useState([]);
    const [stats, setStats] = useState({
        totalPositions: 0,
        totalVacancies: 0,
        totalCVCount: 0
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            // For now using company_id 1, later we'll get it from auth context
            const response = await axios.get("http://localhost:8081/job/company/1");
            
            // Group jobs by job role
            const groupedJobs = response.data.reduce((acc, job) => {
                if (!acc[job.job_role]) {
                    acc[job.job_role] = {
                        title: job.job_role,
                        vacant: 0,
                        totalCV: 0
                    };
                }
                acc[job.job_role].vacant += job.vacancies;
                // For now setting a default CV count, later we'll get real data
                acc[job.job_role].totalCV = 20;
                return acc;
            }, {});

            const formattedJobs = Object.values(groupedJobs);
            setJobCategories(formattedJobs);

            // Update stats
            setStats({
                totalPositions: formattedJobs.length,
                totalVacancies: formattedJobs.reduce((sum, job) => sum + job.vacant, 0),
                totalCVCount: formattedJobs.reduce((sum, job) => sum + job.totalCV, 0)
            });

        } catch (err) {
            console.error("Error fetching jobs:", err);
        }
    };

    return (
        <div className="dashboard-container">
            <header>
                <h1>CV Management Dashboard</h1>
                <p>Search for your desired job matching your skills</p>
            </header>
            <div className="summary-cards">
                <div className="card">TOTAL POSITION: {stats.totalPositions}</div>
                <div className="card">TOTAL VACANCY: {stats.totalVacancies}</div>
                <div className="card">TOTAL CV COUNT: {stats.totalCVCount}</div>
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
                        <button className="summarize-button">Summarize</button>
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
