import express from "express";
import mysql from "mysql";

const router = express.Router();

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "analyzer"
});

// Create a new job posting
router.post("/create", (req, res) => {
    const {
        jobTitle,
        tags,
        jobRole,
        minSalary,
        maxSalary,
        vacancies,
        jobLevel,
        country,
        city,
        jobType,
        jobDescription
    } = req.body;

    const sql = `INSERT INTO job (
        company_id,
        job_title,
        tags,
        job_role,
        min_salary,
        max_salary,
        vacancies,
        job_level,
        country,
        city,
        job_type,
        job_description,
        posted_date,
        is_active
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`;

    // For now, using a default company_id of 1 for testing
    // In production, this should come from the authenticated user's session
    const values = [
        1, // company_id - should come from session
        jobTitle,
        tags,
        jobRole,
        minSalary,
        maxSalary,
        vacancies,
        jobLevel,
        country,
        city,
        jobType,
        jobDescription
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error creating job posting",
                details: err.message 
            });
        }
        return res.status(201).json({
            message: "Job posted successfully",
            jobId: result.insertId
        });
    });
});

// Get all jobs
router.get("/all", (req, res) => {
    const sql = `
        SELECT j.*, c.company_name 
        FROM job j 
        LEFT JOIN company c ON j.company_id = c.company_id 
        WHERE j.is_active = true
        ORDER BY j.posted_date DESC
    `;
    
    db.query(sql, (err, results) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error fetching jobs",
                details: err.message 
            });
        }
        return res.json(results);
    });
});

// Search jobs
router.get("/search", (req, res) => {
    const { search, location, experience } = req.query;
    let sql = `
        SELECT j.*, c.company_name 
        FROM job j 
        LEFT JOIN company c ON j.company_id = c.company_id 
        WHERE j.is_active = true
    `;
    const values = [];

    if (search) {
        sql += ` AND (j.job_title LIKE ? OR j.job_role LIKE ? OR j.job_description LIKE ?)`;
        const searchPattern = `%${search}%`;
        values.push(searchPattern, searchPattern, searchPattern);
    }

    if (location) {
        sql += ` AND (j.city LIKE ? OR j.country LIKE ?)`;
        const locationPattern = `%${location}%`;
        values.push(locationPattern, locationPattern);
    }

    sql += ` ORDER BY j.posted_date DESC`;

    db.query(sql, values, (err, results) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error searching jobs",
                details: err.message 
            });
        }
        return res.json(results);
    });
});

// Get jobs by company
router.get("/company/:companyId", (req, res) => {
    const sql = "SELECT * FROM job WHERE company_id = ? AND is_active = TRUE ORDER BY posted_date DESC";
    db.query(sql, [req.params.companyId], (err, results) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error fetching company jobs",
                details: err.message 
            });
        }
        return res.json(results);
    });
});

// Update a job posting
router.put("/update/:jobId", (req, res) => {
    const jobId = req.params.jobId;
    const {
        jobTitle,
        tags,
        jobRole,
        minSalary,
        maxSalary,
        vacancies,
        jobLevel,
        country,
        city,
        jobType,
        jobDescription
    } = req.body;

    const sql = `UPDATE job SET 
        job_title = ?,
        tags = ?,
        job_role = ?,
        min_salary = ?,
        max_salary = ?,
        vacancies = ?,
        job_level = ?,
        country = ?,
        city = ?,
        job_type = ?,
        job_description = ?
        WHERE job_id = ? AND company_id = ?`;

    const values = [
        jobTitle,
        tags,
        jobRole,
        minSalary,
        maxSalary,
        vacancies,
        jobLevel,
        country,
        city,
        jobType,
        jobDescription,
        jobId,
        1 // company_id - should come from session
    ];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error updating job posting",
                details: err.message 
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }
        return res.json({ message: "Job updated successfully" });
    });
});

// Delete (deactivate) a job posting
router.delete("/delete/:jobId", (req, res) => {
    const sql = "UPDATE job SET is_active = FALSE WHERE job_id = ? AND company_id = ?";
    db.query(sql, [req.params.jobId, 1], (err, result) => {
        if (err) {
            console.error("Error in MySQL:", err);
            return res.status(500).json({ 
                error: "Error deleting job posting",
                details: err.message 
            });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }
        return res.json({ message: "Job deleted successfully" });
    });
});

// Get job roles for dropdown
router.get("/roles", (req, res) => {
    const roles = [
        "Software Developer",
        "Web Developer",
        "Frontend Developer",
        "Backend Developer",
        "Full Stack Developer",
        "Mobile Developer",
        "UI/UX Designer",
        "Product Manager",
        "Project Manager",
        "Business Analyst",
        "Data Scientist",
        "DevOps Engineer",
        "QA Engineer",
        "System Administrator",
        "Network Engineer"
    ];
    res.json(roles);
});

// Get job levels for dropdown
router.get("/levels", (req, res) => {
    const levels = [
        "Entry Level",
        "Junior",
        "Mid Level",
        "Senior",
        "Lead",
        "Manager"
    ];
    res.json(levels);
});

export default router;
