import express from "express";
import mysql from "mysql2/promise";
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
        
        const [result] = await pool.execute(
            'INSERT INTO cv (user_id, job_id, file) VALUES (?, ?, ?)',
            [user_id, job_id, cvData]
        );
        
        fs.unlinkSync(file.path);
        
        res.status(200).json({ message: 'CV uploaded successfully' });
    } catch (error) {
        console.error("Error uploading CV:", error);
        res.status(500).json({ error: 'Error uploading CV', details: error.message });
    }
});

// Create a new job posting
router.post("/create", async (req, res) => {
    try {
        const { company_id, jobTitle, tags, jobRole, minSalary, maxSalary, vacancies, 
                jobLevel, country, city, jobType, jobDescription } = req.body;

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
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ error: "Error creating job posting", details: error.message });
    }
});

// Get all jobs
router.get("/all", async (req, res) => {
    try {
        const [results] = await pool.execute(
            `SELECT j.job_id, j.company_id, j.job_title, j.tags, j.job_role, 
                    j.min_salary, j.max_salary, j.vacancies, j.job_level, 
                    j.country, j.city, j.job_type, j.job_description, 
                    j.posted_date, c.company_name 
            FROM job j 
            LEFT JOIN employer c ON j.company_id = c.id 
            WHERE j.is_active = TRUE
            ORDER BY j.posted_date DESC`
        );
        res.json(results);
    } catch (error) {
        console.error("Error fetching jobs:", error);
        res.status(500).json({ error: "Error fetching jobs", details: error.message });
    }
});

// Get single job
router.get("/onejob/:jobId", async (req, res) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        if (isNaN(jobId)) return res.status(400).json({ error: "Invalid job ID format" });

        const [results] = await pool.execute(
            `SELECT j.*, COALESCE(c.company_name, 'Unknown Company') AS company_name 
            FROM job j 
            LEFT JOIN employer c ON j.company_id = c.id 
            WHERE j.job_id = ? AND j.is_active = TRUE`,
            [jobId]
        );

        if (results.length === 0) {
            return res.status(404).json({ error: "Job not found or inactive" });
        }
        res.json(results[0]);
    } catch (error) {
        console.error("Error fetching job:", error);
        res.status(500).json({ error: "Database error", details: error.message });
    }
});

// Job search
router.get("/search", async (req, res) => {
    try {
        const { search, location, minSalary, maxSalary, jobType, workMode, experienceLevel } = req.query;
        
        let query = `SELECT j.*, c.company_name FROM job j 
                     LEFT JOIN employer c ON j.company_id = c.id WHERE j.is_active = TRUE`;
        const values = [];

        if (search) {
            query += ` AND (j.job_title LIKE ? OR j.job_role LIKE ? OR j.job_description LIKE ?)`;
            const pattern = `%${search}%`;
            values.push(pattern, pattern, pattern);
        }

        if (location) {
            query += ` AND (j.city LIKE ? OR j.country LIKE ?)`;
            const pattern = `%${location}%`;
            values.push(pattern, pattern);
        }

        if (minSalary) {
            query += ` AND j.min_salary >= ?`;
            values.push(minSalary);
        }

        if (maxSalary) {
            query += ` AND j.max_salary <= ?`;
            values.push(maxSalary);
        }

        if (jobType) {
            query += ` AND j.job_type IN (${jobType.split(',').map(() => '?').join(',')})`;
            values.push(...jobType.split(','));
        }

        if (workMode) {
            query += ` AND j.work_mode IN (${workMode.split(',').map(() => '?').join(',')})`;
            values.push(...workMode.split(','));
        }

        if (experienceLevel) {
            query += ` AND j.job_level IN (${experienceLevel.split(',').map(() => '?').join(',')})`;
            values.push(...experienceLevel.split(','));
        }

        query += ` ORDER BY j.posted_date DESC`;

        const [results] = await pool.execute(query, values);
        res.json(results);
    } catch (error) {
        console.error("Error searching jobs:", error);
        res.status(500).json({ error: "Error searching jobs", details: error.message });
    }
});

export default router;
