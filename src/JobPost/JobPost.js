import React from "react";
import "./JobPost.css";  // Make sure your CSS is correctly imported
  // Assuming you have a footer CSS

function JobPostForm() {
    return (
        <div className="job-post-form">
            <h1>Post a job</h1>
            <p>Find the best talent for your company</p>
            <form>
                <div className="form-row">
                    <div className="form-group">
                        <label>Job Title</label>
                        <input type="text" placeholder="Add job title, role vacancies etc" />
                    </div>
                    <div className="form-group">
                        <label>Tags</label>
                        <input type="text" placeholder="Job keyword, tags etc..." />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Job Role</label>
                        <select>
                            <option>Select...</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Min Salary</label>
                        <input type="number" placeholder="Minimum Salary..." />
                    </div>
                    <div className="form-group">
                        <label>Max Salary</label>
                        <input type="number" placeholder="Maximum Salary..." />
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Vacancies</label>
                        <input type="number" placeholder="Enter number" />
                    </div>
                    <div className="form-group">
                        <label>Job Level</label>
                        <select>
                            <option>Select...</option>
                        </select>
                    </div>
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Country</label>
                        <select>
                            <option>Select...</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>City</label>
                        <select>
                            <option>Select...</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label>Job Description/Requirement</label>
                    <textarea placeholder="Add your description..."></textarea>
                </div>

                <button type="submit" className="post-job-btn">Post Job</button>
            </form>

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
                        <p>© 2024 AlwaysApply | <a href="/privacy-policy">Privacy Policy</a> | <a href="/terms">Terms of Service</a></p>
                    </div>
                </div>
            </footer>
        </div>
    );
}

export default JobPostForm;
