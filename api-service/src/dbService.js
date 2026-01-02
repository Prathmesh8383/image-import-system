const { Pool } = require("pg");

const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false
});

module.exports = { pool };

const getImages = async () => {
  const result = await pool.query(
    "SELECT * FROM images ORDER BY created_at DESC"
  );
  return result.rows;
};

module.exports = { getImages };
