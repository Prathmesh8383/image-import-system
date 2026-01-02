const { Pool } = require("pg");
require("dotenv").config();

// Create a PostgreSQL pool
const pool = new Pool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "postgres",
  database: process.env.DB_NAME || "imagesdb",
});

// Function to save image metadata
async function saveImage({ name, s3Url, size, mimeType }) {
  const query = `
    INSERT INTO images (name, s3_url, size, mime_type)
    VALUES ($1, $2, $3, $4)
    RETURNING id;
  `;

  const values = [name, s3Url, size || null, mimeType || null];

  const res = await pool.query(query, values);
  return res.rows[0];
}

module.exports = { saveImage };
