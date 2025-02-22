import express from "express";
import mysql from "mysql2/promise"; // Using mysql2 with promises
import fs from "fs";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

// Create connection pool
const pool = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "analyzer",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// CV Upload Endpoint
router.post('/cv/upload', upload.single('cv'), async (req, res) => {
    try {
        const { user_id, job_id } = req.body;
        const file = req.file;
        
        if (!file) return res.status(400).json({ error: 'No file uploaded' });

        const cvData = fs.readFileSync(file.path);
        
        await pool.execute(
            'INSERT INTO cv (user_id, job_id, file) VALUES (?, ?, ?)',
            [user_id, job_id, cvData]
        );

        fs.unlinkSync(file.path);

        res.status(200).json({ message: 'CV uploaded successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading CV' });
    }
});

// Create a new job posting
router.post("/create", async (req, res) => {
    try {
        const {
            company_id, jobTitle, tags, jobRole, minSalary, maxSalary,
            vacancies, jobLevel, country, city, jobType, jobDescription
        } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO job (
                company_id, job_title, tags, job_role, min_salary, max_salary,
                vacancies, job_level, country, city, job_type, job_description,
                posted_date, is_active
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
            [company_id, jobTitle, tags, jobRole, minSalary, maxSalary, vacancies,
            jobLevel, country, city, jobType, jobDescription]
        );

        res.status(201).json({ message: "Job posted successfully", jobId: result.insertId });
    } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).json({ error: "Error creating job posting", details: err.message });
    }
});

// Get all jobs
router.get("/all", async (req, res) => {
    try {
        const [results] = await pool.execute(`
            SELECT j.job_id, j.company_id, j.job_title, j.tags, j.job_role, 
                   j.min_salary, j.max_salary, j.vacancies, j.job_level, 
                   j.country, j.city, j.job_type, j.job_description, 
                   j.posted_date, c.company_name 
            FROM job j 
            LEFT JOIN employer c ON j.company_id = c.id 
            WHERE j.is_active = TRUE
            ORDER BY j.posted_date DESC
        `);
        
        res.json(results);
    } catch (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ error: "Error fetching jobs", details: err.message });
    }
});

// Get a single job
router.get("/onejob/:jobId", async (req, res) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        if (isNaN(jobId)) return res.status(400).json({ error: "Invalid job ID format" });

        const [results] = await pool.execute(`
            SELECT j.*, COALESCE(c.company_name, 'Unknown Company') AS company_name 
            FROM job j 
            LEFT JOIN employer c ON j.company_id = c.id 
            WHERE j.job_id = ? AND j.is_active = TRUE
        `, [jobId]);

        if (results.length === 0) {
            return res.status(404).json({ error: "Job not found or inactive" });
        }

        res.json(results[0]);
    } catch (err) {
        console.error("Error fetching job:", err);
        res.status(500).json({ error: "Database error", details: err.message });
    }
});

// Get jobs by company
router.get("/company/:companyId", async (req, res) => {
    try {
        const [results] = await pool.execute(
            "SELECT * FROM job WHERE company_id = ? AND is_active = TRUE ORDER BY posted_date DESC",
            [req.params.companyId]
        );
        res.json(results);
    } catch (err) {
        console.error("Error fetching company jobs:", err);
        res.status(500).json({ error: "Error fetching company jobs", details: err.message });
    }
});

// Update a job posting
router.put("/update/:jobId", async (req, res) => {
    try {
        const { jobTitle, tags, jobRole, minSalary, maxSalary, vacancies,
                jobLevel, country, city, jobType, jobDescription } = req.body;
        const jobId = parseInt(req.params.jobId, 10);

        const [result] = await pool.execute(
            `UPDATE job SET 
                job_title = ?, tags = ?, job_role = ?, min_salary = ?, max_salary = ?, 
                vacancies = ?, job_level = ?, country = ?, city = ?, job_type = ?, 
                job_description = ? WHERE job_id = ?`,
            [jobTitle, tags, jobRole, minSalary, maxSalary, vacancies, jobLevel, 
            country, city, jobType, jobDescription, jobId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        res.json({ message: "Job updated successfully" });
    } catch (err) {
        console.error("Error updating job posting:", err);
        res.status(500).json({ error: "Error updating job posting", details: err.message });
    }
});

// Delete (deactivate) a job posting
router.delete("/delete/:jobId", async (req, res) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        const [result] = await pool.execute(
            "UPDATE job SET is_active = FALSE WHERE job_id = ?", 
            [jobId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Job not found or unauthorized" });
        }

        res.json({ message: "Job deleted successfully" });
    } catch (err) {
        console.error("Error deleting job posting:", err);
        res.status(500).json({ error: "Error deleting job posting", details: err.message });
    }
});

// Job roles dropdown
router.get("/roles", (req, res) => {
    res.json(["Software Developer", "Web Developer", "Backend Developer", "Data Scientist"]);
});

// Job levels dropdown
router.get("/levels", (req, res) => {
    res.json(["Entry Level", "Junior", "Mid Level", "Senior", "Lead", "Manager"]);
});

export default router;
