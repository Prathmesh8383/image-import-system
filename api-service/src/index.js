import express from "express";
import cors from "cors";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

const app = express();

/* ================================
   SAFE ENV VARIABLE PARSING
================================ */

// PORT
const PORT = process.env.PORT || 10000;

// ALLOWED_ORIGINS (JSON array expected)
let allowedOrigins = [];
try {
  allowedOrigins = process.env.ALLOWED_ORIGINS
    ? JSON.parse(process.env.ALLOWED_ORIGINS)
    : [];
} catch (error) {
  console.error("❌ Invalid JSON in ALLOWED_ORIGINS env variable");
  allowedOrigins = [];
}

// APP_CONFIG (optional JSON config)
let appConfig = {};
try {
  appConfig = process.env.APP_CONFIG
    ? JSON.parse(process.env.APP_CONFIG)
    : {};
} catch (error) {
  console.error("❌ Invalid JSON in APP_CONFIG env variable");
  appConfig = {};
}

/* ================================
   MIDDLEWARES
================================ */

app.use(express.json());

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

/* ================================
   ROUTES
================================ */

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Image Import API is running 🚀",
    configLoaded: Object.keys(appConfig).length > 0,
  });
});

// Health check
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ================================
   SERVER START
================================ */

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
  console.log("Allowed Origins:", allowedOrigins);
});
