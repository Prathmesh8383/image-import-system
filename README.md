# Image Import System – Backend API

## 📌 Assignment Overview
This project implements a **Backend API service** for an Image Import System.  
The service is designed to be **cloud-deployed**, **secure**, and **scalable**, following modern backend best practices.

---

## 🚀 Live Deployment

- **Backend API:**  
  https://image-import-api-1kgg.onrender.com

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v20)
- **Framework:** Express.js
- **Database:** PostgreSQL (Render Managed DB)
- **Cloud Platform:** Render
- **Environment Management:** dotenv
- **Containerization:** Docker
- **Version Control:** Git & GitHub

---

## 📂 Project Structure
# Image Import System – Backend API

## 📌 Assignment Overview
This project implements a **Backend API service** for an Image Import System.  
The service is designed to be **cloud-deployed**, **secure**, and **scalable**, following modern backend best practices.

---

## 🚀 Live Deployment

- **Backend API:**  
  https://image-import-api-1kgg.onrender.com

- **Frontend:**  
  N/A (Backend-only assignment)

---

## 🛠 Tech Stack

- **Runtime:** Node.js (v20)
- **Framework:** Express.js
- **Database:** PostgreSQL (Render Managed DB)
- **Cloud Platform:** Render
- **Environment Management:** dotenv
- **Containerization:** Docker
- **Version Control:** Git & GitHub

---

## 📂 Project Structure

api-service/
│
├── src/
│ └── index.js # Main application entry point
│
├── package.json
├── package-lock.json
├── Dockerfile
└── README.mdapi-service/
│
├── src/
│ └── index.js # Main application entry point
│
├── package.json
├── package-lock.json
├── Dockerfile
└── README.md

---

## 🔐 Environment Configuration

The application uses environment variables for secure configuration.

### Example Environment Variables (Render Dashboard)


---

## 🔐 Environment Configuration

The application uses environment variables for secure configuration.

### Example Environment Variables (Render Dashboard)

DATABASE_URL=<Render PostgreSQL URL>
GOOGLE_SERVICE_ACCOUNT=<Service Account JSON>
APP_CONFIG=<Optional JSON config>
ALLOWED_ORIGINS=<Optional JSON array>


> Safe JSON parsing is implemented to prevent crashes if variables are missing.

---

## 📡 API Endpoints

### Health Check

GET /

**Response:**
```json
{
  "success": true,
  "message": "Image Import API is running 🚀",
  "configLoaded": true
}

GET /images



