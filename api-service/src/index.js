require("dotenv").config();

const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
const PORT = 4000;

/* ---------- MIDDLEWARE ---------- */
app.use(cors());               // 🔑 IMPORTANT for frontend
app.use(express.json());

/* ---------- DATABASE ---------- */
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "postgres",
  database: "imagesdb",
  port: 5432,
});

/* ---------- HEALTH CHECK ---------- */
app.get("/", (req, res) => {
  res.send("API Service is running 🚀");
});

/* ---------- GET IMAGES API ---------- */
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

/* ---------- START SERVER ---------- */
app.listen(PORT, () => {
  console.log(`API Service running on http://localhost:${PORT}`);
});
