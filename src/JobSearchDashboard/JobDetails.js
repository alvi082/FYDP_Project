import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./JobDetails.css";

const JobDetails = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8081/job/onejob/${jobId}`);

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch job");
        }

        const data = await response.json();
        setJob(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  if (loading) return <div className="loading">Loading job details...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="job-page">
      <div className="job-details-container">
        {/* Back Button */}
        <button className="back-btn" onClick={() => navigate(-1)}>
          &larr; Back to Jobs
        </button>

        {/* Job Header */}
        <div className="job-section job-header">
          <h1>{job.job_title}</h1>
          <div className="company-info">{job.company_name}</div>
          <div className={`status-badge ${job.is_active ? "active" : "closed"}`}>
            {job.is_active ? "Active" : "Closed"}
          </div>
        </div>

        {/* Tags */}
        <div className="job-section tags-list">
          {job.tags &&
            job.tags.split(",").map((tag, index) => (
              <span key={index} className="tag">
                {tag.trim()}
              </span>
            ))}
        </div>

        {/* Job Meta Section */}
         <div className="job-meta">
            <div className="meta-item">
                <h3><span className="meta-icon">📍</span> Location</h3>
                <p>{job.city}, {job.country}</p>
            </div>
            <div className="meta-item">
                <h3><span className="meta-icon">📝</span> Job Type</h3>
                <p>{job.job_type}</p>
            </div>
            <div className="meta-item">
                <h3><span className="meta-icon">💰</span> Salary Range</h3>
                <p>${job.min_salary.toLocaleString()} - ${job.max_salary.toLocaleString()}</p>
            </div>
            <div className="meta-item">
                <h3><span className="meta-icon">👥</span> Vacancies</h3>
                <p>{job.vacancies}</p>
            </div>
         </div>

        {/* Job Description */}
        <div className="job-section">
          <h2>📄 Job Description</h2>
          <p>{job.job_description}</p>
        </div>

        <div className="job-section">
          <h2>🎯 Key Responsibilities</h2>
          <p>{job.job_role}</p>
        </div>

        {/* Job Footer */}
        <div className="job-section job-footer">
          <p className="post-date">
            📅 Posted on: {new Date(job.posted_date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <p className="job-level">🎓 Experience Level: {job.job_level}</p>
        </div>

        {/* Apply Button */}
        <div className="apply-container">
          <button className="apply-btn">Apply Now</button>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;
