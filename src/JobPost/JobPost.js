import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./JobPost.css";

function JobPostForm() {
    const [formData, setFormData] = useState({
        company_id: "", // Initialize company_id
        jobTitle: "",
        tags: "",
        jobRole: "",
        minSalary: "",
        maxSalary: "",
        vacancies: "",
        jobLevel: "",
        country: "",
        city: "",
        jobType: "Full-time",
        jobDescription: ""
    });

    const [jobRoles, setJobRoles] = useState([]);
    const [jobLevels, setJobLevels] = useState([]);
    const [errors, setErrors] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const [popupMessage, setPopupMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSessionData = async () => {
            try {
                const response = await axios.get("http://localhost:8081/auth/employer/dashboard", { withCredentials: true });
                if (response.data && response.data.company_id) {
                    
                    setFormData(prev => ({
                        ...prev,
                        company_id: response.data.company_id 
                    }));
                } else {
                    console.log("No user data found");
                }
            } catch (error) {
                console.error("Error fetching session data:", error);
            }
        };

        fetchSessionData();
    }, []);

    useEffect(() => {
        // Fetch job roles and levels when component mounts
        fetchJobRoles();
        fetchJobLevels();
    }, []);

    const fetchJobRoles = async () => {
        try {
            const response = await axios.get("http://localhost:8081/job/roles");
            setJobRoles(response.data);
        } catch (error) {
            console.error("Error fetching job roles:", error);
        }
    };

    const fetchJobLevels = async () => {
        try {
            const response = await axios.get("http://localhost:8081/job/levels");
            setJobLevels(response.data);
        } catch (error) {
            console.error("Error fetching job levels:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.jobTitle.trim()) newErrors.jobTitle = "Job title is required";
        if (!formData.jobRole) newErrors.jobRole = "Job role is required";
        if (!formData.jobLevel) newErrors.jobLevel = "Job level is required";
        if (!formData.country.trim()) newErrors.country = "Country is required";
        if (!formData.city.trim()) newErrors.city = "City is required";
        if (!formData.jobDescription.trim()) newErrors.jobDescription = "Job description is required";
        if (formData.minSalary && formData.maxSalary && 
            Number(formData.minSalary) > Number(formData.maxSalary)) {
            newErrors.maxSalary = "Maximum salary must be greater than minimum salary";
        }
        if (!formData.vacancies || formData.vacancies < 1) {
            newErrors.vacancies = "Number of vacancies must be at least 1";
        }
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            const response = await axios.post("http://localhost:8081/job/create", formData);
            setPopupMessage("Job posted successfully!");
            setShowPopup(true);
            
            // Clear form
            setFormData({
                company_id: formData.company_id, // Keep the company_id
                jobTitle: "",
                tags: "",
                jobRole: "",
                minSalary: "",
                maxSalary: "",
                vacancies: "",
                jobLevel: "",
                country: "",
                city: "",
                jobType: "Full-time",
                jobDescription: ""
            });
            
            // Navigate to dashboard after a short delay to show success message
            setTimeout(() => {
                setShowPopup(false);
                navigate("/dashboard"); // Navigate to dashboard
            }, 2000);
        } catch (error) {
            console.error("Error posting job:", error);
            setPopupMessage("Error posting job. Please try again.");
            setShowPopup(true);
            setTimeout(() => {
                setShowPopup(false);
            }, 2000);
        }
    };

    return (
        <div className="job-post-form">
            <h1>Post a job</h1>
            <p>Find the best talent for your company</p>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input
                            type="text"
                            name="jobTitle"
                            value={formData.jobTitle}
                            onChange={handleInputChange}
                            placeholder="Add job title, role vacancies etc"
                        />
                        {errors.jobTitle && <span className="error">{errors.jobTitle}</span>}
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input
                            type="text"
                            name="tags"
                            value={formData.tags}
                            onChange={handleInputChange}
                            placeholder="Job keyword, tags etc..."
                        />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Job Role</label>
                        <select
                            name="jobRole"
                            value={formData.jobRole}
                            onChange={handleInputChange}
                        >
                            <option value="">Select...</option>
                            {jobRoles.map((role, index) => (
                                <option key={index} value={role}>{role}</option>
                            ))}
                        </select>
                        {errors.jobRole && <span className="error">{errors.jobRole}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Min Salary</label>
                        <input
                            type="number"
                            name="minSalary"
                            value={formData.minSalary}
                            onChange={handleInputChange}
                            placeholder="Minimum Salary..."
                        />
                    </div>
                    <div className="form-group">
                        <label>Max Salary</label>
                        <input
                            type="number"
                            name="maxSalary"
                            value={formData.maxSalary}
                            onChange={handleInputChange}
                            placeholder="Maximum Salary..."
                        />
                        {errors.maxSalary && <span className="error">{errors.maxSalary}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Vacancies</label>
                        <input
                            type="number"
                            name="vacancies"
                            value={formData.vacancies}
                            onChange={handleInputChange}
                            placeholder="Enter number"
                            min="1"
                        />
                        {errors.vacancies && <span className="error">{errors.vacancies}</span>}
                    </div>
                    <div className="form-group">
                        <label>Job Level</label>
                        <select
                            name="jobLevel"
                            value={formData.jobLevel}
                            onChange={handleInputChange}
                        >
                            <option value="">Select...</option>
                            {jobLevels.map((level, index) => (
                                <option key={index} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.jobLevel && <span className="error">{errors.jobLevel}</span>}
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Country</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            placeholder="Enter country"
                        />
                        {errors.country && <span className="error">{errors.country}</span>}
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            placeholder="Enter city"
                        />
                        {errors.city && <span className="error">{errors.city}</span>}
                    </div>
                </div>

                <div className="form-group">
                    <label>Job Type</label>
                    <select
                        name="jobType"
                        value={formData.jobType}
                        onChange={handleInputChange}
                    >
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Contract">Contract</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Job Description/Requirement</label>
                    <textarea
                        name="jobDescription"
                        value={formData.jobDescription}
                        onChange={handleInputChange}
                        placeholder="Add your description..."
                    ></textarea>
                    {errors.jobDescription && <span className="error">{errors.jobDescription}</span>}
                </div>

                <button type="submit" className="post-job-btn">Post Job</button>
            </form>

            {showPopup && (
                <div className="popup">
                    <div className="popup-content">
                        <span className="checkmark">✓</span>
                        <p>{popupMessage}</p>
                    </div>
                </div>
            )}

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
                        <p> 2024 AlwaysApply | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default JobPostForm;