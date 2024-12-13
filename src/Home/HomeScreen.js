import React from 'react';
import './HomeScreen.css'; // Importing the CSS file for styling
import { Link } from 'react-router-dom';

const HomeScreen = () => {
    const jobs = [
        {
            id: 1,
            title: 'Technical Support Specialist',
            type: 'PART-TIME',
            company: 'Google Inc.',
            location: 'New Delhi, India',
            salary: '20,000 INR - 25,000 INR',
        },
        {
            id: 2,
            title: 'Senior UI/UX Designer',
            type: 'FULL-TIME',
            company: 'Apple',
            location: 'Boston, USA',
            salary: '30,000 - 55,000 USD',
        },
        {
            id: 3,
            title: 'Marketing Officer',
            type: 'PART-TIME',
            company: 'Intel Corp',
            location: 'Bangalore, India',
            salary: '15,000 INR - 35,000 INR',
        },
    ];

    return (
        <div className="home-container">
            {/* Header Section */}
            <header className="header">
                <div className="logo">AlwaysApply</div>
                <div className="actions">
                    <button className="button contact-button">Contact Us</button>
                    <Link to="/login">
                        <button className="button login-button">Login</button>
                    </Link>
                </div>
            </header>

            {/* Job Search Section */}
            <div className="search-container">
                <div className="search-text">
                    <h1>Find a job that aligns with your interests and skills</h1>
                    <p>Thousands of jobs in all the leading sectors are waiting for you.</p>
                    <div className="search-inputs">
                        <input type="text" placeholder="Job title, Keyword..."/>
                        <input type="text" placeholder="Location"/>
                        <button className="search-button">Find Job</button>
                    </div>
                    <p className="suggestions">
                        Suggestions: UI/UX Designer, Programming, Digital Marketing, Video, Animation.
                    </p>
                </div>
                <div className="search-image"></div>
            </div>

            {/* Featured Jobs Section */}
            <div className="featured-jobs">
                <h2>Featured Jobs</h2>
                <p>Choose jobs from the top employers and apply for the same.</p>
                <div className="jobs-list">
                    {jobs.map((job) => (
                        <div key={job.id} className="job-card">
                            <h3>{job.title}</h3>
                            <p className="job-type">{job.type}</p>
                            <p className="company">{job.company}</p>
                            <p className="location">{job.location}</p>
                            <p className="salary">{job.salary}</p>
                            <button className="apply-button">Apply now</button>
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer Section */}
            <footer className="footer">
                <div className="footer-container">
                    <h3>Contact Us</h3>
                    <p>We are here to assist you. Reach out to us for more information or queries.</p>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">Facebook</a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                    </div>
                    <div className="footer-bottom">
                        <p>© 2024 AlwaysApply | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of
                            Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default HomeScreen;
