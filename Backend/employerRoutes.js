import express from "express";
import mysql from "mysql";

const router = express.Router();

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "analyzer",
});

router.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO employer (name, address, email, phone_number, password, company_name, company_website, company_description, industry_type) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.email,
    req.body.phone_number,
    req.body.password,
    req.body.company_name,
    req.body.company_website,
    req.body.company_description,
    req.body.industry_type,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error in MySQL:", err);
      return res.status(500).json({ error: "Error in database" });
    }
    return res.status(201).json({ message: "Employer signed up successfully" });
  });
});

export default router;
