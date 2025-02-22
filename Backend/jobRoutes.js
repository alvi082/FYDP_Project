import express from "express";
import mysql from "mysql2/promise"; // Changed to mysql2/promise
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
        console.error(error);
        res.status(500).json({ error: 'Error uploading CV' });
    }
});

// Modified all database calls to use connection pool
// Create a new job posting
router.post("/create", async (req, res) => {
    try {
        const { company_id, jobTitle, tags, jobRole, minSalary, maxSalary, vacancies, 
                jobLevel, country, city, jobType, jobDescription } = req.body;

        const [result] = await pool.execute(
            `INSERT INTO job (
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
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), TRUE)`,
            [
                company_id,
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
            ]
        );

        res.status(201).json({
            message: "Job posted successfully",
            jobId: result.insertId
        });
    } catch (err) {
        console.error("Error creating job:", err);
        res.status(500).json({ 
            error: "Error creating job posting",
            details: err.message 
        });
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
        res.status(500).json({ 
            error: "Error fetching jobs",
            details: err.message 
        });
    }
});

// Get single job
router.get("/onejob/:jobId", async (req, res) => {
    try {
        const jobId = parseInt(req.params.jobId, 10);
        if (isNaN(jobId)) return res.status(400).json({ error: "Invalid job ID format" });

        const [results] = await pool.execute(`
            SELECT j.job_id, j.company_id, j.job_title, 
                   j.tags, j.job_role, j.min_salary, 
                   j.max_salary, j.vacancies, j.job_level, 
                   j.country, j.city, j.job_type, 
                   j.job_description, j.posted_date, 
                   COALESCE(c.company_name, 'Unknown Company') AS company_name 
            FROM job j 
            LEFT JOIN employer c ON j.company_id = c.id 
            WHERE j.job_id = ? AND j.is_active = TRUE
        `, [jobId]);

        if (results.length === 0) {
            return res.status(404).json({ 
                error: "Job not found or inactive",
                possibleReasons: [
                    "Invalid job ID",
                    "Job has been deactivated",
                    "Company info missing"
                ]
            });
        }

        res.json({
            ...results[0],
            posted_date: new Date(results[0].posted_date).toISOString()
        });
    } catch (err) {
        console.error("Error fetching job:", err);
        res.status(500).json({ 
            error: "Database error",
            details: err.message 
        });
    }
});

// Job search
router.get("/search", async (req, res) => {
    try {
        const { search, location, experience, minSalary, maxSalary, 
                jobType, workMode, experienceLevel } = req.query;
        
        let query = `
            SELECT j.*, c.company_name 
            FROM job j 
            LEFT JOIN company c ON j.company_id = c.company_id 
            WHERE j.is_active = true
        `;
        const values = [];

        // Add filter conditions
        if (search) {
            query += ` AND (j.job_title LIKE ? OR j.job_role LIKE ? OR j.job_description LIKE ?)`;
            const searchPattern = `%${search}%`;
            values.push(searchPattern, searchPattern, searchPattern);
        }

        if (location) {
            query += ` AND (j.city LIKE ? OR j.country LIKE ?)`;
            const locationPattern = `%${location}%`;
            values.push(locationPattern, locationPattern);
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
            const types = jobType.split(',').filter(Boolean);
            if (types.length > 0) {
                query += ` AND j.job_type IN (${types.map(() => '?').join(',')})`;
                values.push(...types);
            }
        }

        if (workMode) {
            const modes = workMode.split(',').filter(Boolean);
            if (modes.length > 0) {
                query += ` AND j.work_mode IN (${modes.map(() => '?').join(',')})`;
                values.push(...modes);
            }
        }

        if (experienceLevel) {
            const levels = experienceLevel.split(',').filter(Boolean);
            if (levels.length > 0) {
                query += ` AND j.job_level IN (${levels.map(() => '?').join(',')})`;
                values.push(...levels);
            }
        }

        query += ` ORDER BY j.posted_date DESC`;

        const [results] = await pool.execute(query, values);
        res.json(results);

    } catch (err) {
        console.error("Error searching jobs:", err);
        res.status(500).json({ 
            error: "Error searching jobs",
            details: err.message 
        });
    }
});

// Update other routes similarly using async/await and connection pool...

export default router;