import React, { useState, useEffect } from "react";
import axios from "axios";
import "./JobSearchDashboard.css";
import { Link } from 'react-router-dom';

function JobSearchDashboard() {
    const [isPopupVisible, setPopupVisible] = useState(false);
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filters, setFilters] = useState({
        search: "",
        location: "",
        experience: "",
        minSalary: "",
        maxSalary: "",
        jobType: {
            "Full-Time": false,
            "Part-Time": false,
            "Internship": false
        },
        workMode: {
            "On-Site": false,
            "Remote": false,
            "Hybrid": false
        },
        experienceLevel: {
            "Fresher/Entry-Level": false,
            "Junior": false,
            "Mid-Level": false
        }
    });

    useEffect(() => {
        fetchJobs();
    }, []);

    const fetchJobs = async () => {
        try {
            const response = await axios.get("http://localhost:8081/job/all");
            const formattedJobs = response.data.map(job => ({
                id: job.job_id,
                title: job.job_title,
                type: job.job_type,
                salary: `${job.min_salary ? job.min_salary : ''} - ${job.max_salary ? job.max_salary : ''}`,
                company: job.company_name || "Company Name",
                location: `${job.city}, ${job.country}`,
                applicants: "0+" // We'll update this when we have applications table
            }));
            setJobs(formattedJobs);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching jobs:", err);
            setLoading(false);
        }
    };

    const handleSearch = async () => {
        try {
            const queryParams = new URLSearchParams({
                search: filters.search,
                location: filters.location,
                experience: filters.experience
            }).toString();
            
            const response = await axios.get(`http://localhost:8081/job/search?${queryParams}`);
            const formattedJobs = response.data.map(job => ({
                id: job.job_id,
                title: job.job_title,
                type: job.job_type,
                salary: `${job.min_salary ? job.min_salary : ''} - ${job.max_salary ? job.max_salary : ''}`,
                company: job.company_name || "Company Name",
                location: `${job.city}, ${job.country}`,
                applicants: "0+"
            }));
            setJobs(formattedJobs);
        } catch (err) {
            console.error("Error searching jobs:", err);
        }
    };

    const handleApply = async (jobId) => {
        try {
            // We'll implement this when we have the applications table
            // await axios.post(`http://localhost:8081/job/apply/${jobId}`);
            setPopupVisible(true);
            setTimeout(() => {
                setPopupVisible(false);
            }, 3000);
        } catch (err) {
            console.error("Error applying to job:", err);
        }
    };

    const handleFilterChange = (e, filterType, value) => {
        if (filterType === 'jobType' || filterType === 'workMode' || filterType === 'experienceLevel') {
            setFilters(prev => ({
                ...prev,
                [filterType]: {
                    ...prev[filterType],
                    [value]: e.target.checked
                }
            }));
        } else {
            setFilters(prev => ({
                ...prev,
                [filterType]: e.target.value
            }));
        }
    };

    return (
        <div className="dashboard-container">
            <nav className="navbar">
                <div className="logo">AlwaysApply</div>
                <div className="nav-links">
                    <Link to="/profile"><a href="/src/Profile/Profile">Profile</a></Link>
                    <Link to="/Login">
                        <button className="login-btn">Alvi</button>
                    </Link>
                </div>
            </nav>

            <section className="search-section">
                <h1>Job Search</h1>
                <p>Search for your desired job matching your skills</p>
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="Enter Job Title"
                        value={filters.search}
                        onChange={(e) => handleFilterChange(e, 'search')}
                    />
                    <input 
                        type="text" 
                        placeholder="Enter Location"
                        value={filters.location}
                        onChange={(e) => handleFilterChange(e, 'location')}
                    />
                    <input 
                        type="text" 
                        placeholder="Years of Experience"
                        value={filters.experience}
                        onChange={(e) => handleFilterChange(e, 'experience')}
                    />
                    <button className="search-btn" onClick={handleSearch}>Search</button>
                </div>
            </section>

            <div className="content">
                <aside className="filter">
                    <h3>Filter</h3>
                    <div className="filter-group">
                        <h4>Salary Range</h4>
                        <input 
                            type="text" 
                            placeholder="Min"
                            value={filters.minSalary}
                            onChange={(e) => handleFilterChange(e, 'minSalary')}
                        />
                        <input 
                            type="text" 
                            placeholder="Max"
                            value={filters.maxSalary}
                            onChange={(e) => handleFilterChange(e, 'maxSalary')}
                        />
                    </div>
                    <div className="filter-group">
                        <h4>Job Type</h4>
                        {Object.keys(filters.jobType).map(type => (
                            <label key={type}>
                                <input 
                                    type="checkbox"
                                    checked={filters.jobType[type]}
                                    onChange={(e) => handleFilterChange(e, 'jobType', type)}
                                /> {type}
                            </label>
                        ))}

                        <h4>Work Mode</h4>
                        {Object.keys(filters.workMode).map(mode => (
                            <label key={mode}>
                                <input 
                                    type="checkbox"
                                    checked={filters.workMode[mode]}
                                    onChange={(e) => handleFilterChange(e, 'workMode', mode)}
                                /> {mode}
                            </label>
                        ))}

                        <h4>Experience Level</h4>
                        {Object.keys(filters.experienceLevel).map(level => (
                            <label key={level}>
                                <input 
                                    type="checkbox"
                                    checked={filters.experienceLevel[level]}
                                    onChange={(e) => handleFilterChange(e, 'experienceLevel', level)}
                                /> {level}
                            </label>
                        ))}
                    </div>
                </aside>

                <main className="jobs-container">
                    <h2>All Jobs ({jobs.length})</h2>
                    {loading ? (
                        <div className="loading">Loading jobs...</div>
                    ) : (
                        <div className="jobs-grid">
                            {jobs.map((job) => (
                                <div key={job.id} className="job-card">
                                    <h3>{job.title}</h3>
                                    <p>{job.type} - Salary: {job.salary}</p>
                                    <p>Company: {job.company}</p>
                                    <p>Location: {job.location}</p>
                                    <p>{job.applicants} applicants</p>
                                    <div className="job-actions">
                                        <button className="view-btn">View Details</button>
                                        <button className="apply-btn" onClick={() => handleApply(job.id)}>
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="view-more">
                        <button>View More</button>
                    </div>
                </main>
            </div>

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
