import express from "express";
import mysql from "mysql";

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "analyzer",
});

// Middleware to check if the user is logged in as an employer
const isEmployer = (req, res, next) => {
  if (req.session.userType === 'employer') {
    next();
  } else {
    res.status(403).json({ Message: "Access denied. Please login as an employer." });
  }
};

router.post("/login", (req, res) => {
  // First try job_seeker table
  const jobSeekerSql = "SELECT * FROM job_seeker WHERE email = ? AND password = ?";
  db.query(jobSeekerSql, [req.body.email, req.body.password], (err, jobSeekerResult) => {
    if (err) return res.json({ Message: "Error inside server" });

    if (jobSeekerResult.length > 0) {
      req.session.username = jobSeekerResult[0].name;
      req.session.useremail = jobSeekerResult[0].email;
      req.session.userType = 'jobseeker';
      return res.json({
        Login: true,
        username: req.session.username,
        useremail: req.session.useremail,
        userType: 'jobseeker'
      });
    } else {
      // If not found in job_seeker, try employer table
      const employerSql = "SELECT * FROM employer WHERE email = ? AND password = ?";
      db.query(employerSql, [req.body.email, req.body.password], (err, employerResult) => {
        if (err) return res.json({ Message: "Error inside server" });

        if (employerResult.length > 0) {
          req.session.username = employerResult[0].name;
          req.session.useremail = employerResult[0].email;
          req.session.userType = 'employer';
          req.session.company_id = employerResult[0].company_id;
          return res.json({
            Login: true,
            username: req.session.username,
            useremail: req.session.useremail,
            userType: 'employer'
          });
        } else {
          return res.json({ Login: false });
        }
      });
    }
  });
});

// Route accessible only after employer login
router.get("/employer/dashboard", isEmployer, (req, res) => {
  // You can perform actions specific to the employer here
  res.json({
    Message: "Welcome to the employer dashboard",
    username: req.session.username,
    useremail: req.session.useremail
  });
});

export default router;