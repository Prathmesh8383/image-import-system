require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false, // required for Render Postgres
  },
});

// Google service account
let googleAccount;
try {
  googleAccount = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT);
} catch (err) {
  console.error("GOOGLE_SERVICE_ACCOUNT is invalid or missing", err);
}

// Health check
app.get("/", (req, res) => {
  res.send("API Service is running 🚀");
});

// Get images
app.get("/images", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT id, name, s3_url, size, mime_type, created_at FROM images ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    console.error("DB error:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API Service running on port ${PORT}`);
});
