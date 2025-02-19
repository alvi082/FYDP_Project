import express from "express";
import mysql from "mysql";

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "analyzer",
});

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
          req.session.company_name = employerResult[0].company_name;
          req.session.company_id = employerResult[0].id; 
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


const isEmployer = (req, res, next) => {
  if (req.session.userType === 'employer') {
    next();
  } else {
    res.status(403).json({ Message: "Access denied. Please login as an employer." });
  }
};

router.get("/employer/dashboard", isEmployer, (req, res) => {
  res.json({
    Message: "Welcome to the employer dashboard",
    company_id: req.session.company_id,
    useremail: req.session.useremail,
    company_name: req.session.company_name
  });
});

export default router;
