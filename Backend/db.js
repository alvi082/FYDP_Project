// const express=require('express')
import express from "express";
import mysql from "mysql";
import cors from "cors";
import session from "express-session";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import employerRoutes from "./employerRoutes.js";
import authRoutes from "./authRoutes.js";
import jobRoutes from "./jobRoutes.js";

const app = express();
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["POST", "GET"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "analyzer",
});

// Use the employer routes
app.use("/employer", employerRoutes);
app.use("/auth", authRoutes);
app.use("/job", jobRoutes);

app.post("/signup", (req, res) => {
  const sql =
    "INSERT INTO job_seeker (name,address, email,phone_number,password) VALUES (?, ?, ?, ?, ?)";
  const values = [
    req.body.name,
    req.body.address,
    req.body.email,
    req.body.phone_number,
    req.body.password,
  ];

  db.query(sql, values, (err, result) => {
    if (err) {
      console.error("Error in MySQL:", err);
      return res.status(500).json({ error: "Error in database" });
    }
    return res.status(201).json({ message: "User signed up successfully" });
  });
});

app.post("/login", (req, res) => {
  const sql = "SELECT * FROM job_seeker WHERE email = ? AND password = ?";
  db.query(sql, [req.body.email, req.body.password], (err, result) => {
    if (err) return res.json({ Message: "Error inside server" });

    if (result.length > 0) {
      req.session.username = result[0].name;
      req.session.useremail = result[0].email;
      return res.json({
        Login: true,
        username: req.session.username,
        useremail: req.session.useremail,
      });
    } else return res.json({ Login: false });
  });
});

app.get("/", (req, res) => {
  if (req.session.username) {
    return res.json({
      valid: true,
      username: req.session.username,
      useremail: req.session.useremail,
    });
  } else {
    return res.json({ valid: false });
  }
});

app.get("/job_seeker", (req, res) => {
  // Ensure the session variable is set
  if (!req.session.useremail) {
    return res.status(401).json({ message: "User  not logged in" });
  }

  const sql = "SELECT * FROM job_seeker WHERE email = ?";
  db.query(sql, [req.session.useremail], (err, data) => {
    if (err) {
      console.error("Error querying database:", err);
      return res.status(500).json({ error: "Database query error" });
    }
    return res.json(data);
  });
});

// Test database connection
db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database");
});

app.listen(8081, () => {
  console.log("Connected to the server");
});
