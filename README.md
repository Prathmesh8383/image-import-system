# 📂 Scalable Image Import System From Google Drive

A scalable, multi-service backend system to import images from a public Google Drive folder, store them in cloud object storage, persist metadata in PostgreSQL, and display them using a simple frontend UI.

## 🌐 Live URLs

**Frontend:** https://<frontend-service-url>  
**API Base URL:** https://<api-service-url>


---

## 🧩 Objective
A scalable backend system to import images from a public Google Drive folder, store them in cloud object storage, persist metadata in a SQL database, and expose APIs to manage and retrieve images.

---

## 🏗 System Architecture

Frontend (HTML / JS)  
→ API Service (Node.js / Express)  
→ Worker Service (Background Processing)  
→ PostgreSQL (Metadata Storage)  
→ Object Storage (S3 / MinIO)

---

## 🔌 Backend Services

### API Service
- Exposes REST APIs
- Accepts Google Drive folder URLs
- Triggers background import jobs
- Returns stored image metadata

### Worker Service
- Fetches images from Google Drive
- Uploads images to object storage
- Stores metadata in PostgreSQL
- Designed for large-scale imports

---

## 📡 API Documentation

### POST /import/google-drive
Imports images from a public Google Drive folder.

**Request**
```json
{
  "folderUrl": "https://drive.google.com/drive/folders/<FOLDER_ID>"
}

