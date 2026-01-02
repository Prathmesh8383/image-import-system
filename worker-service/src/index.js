require("dotenv").config();
const path = require("path");
const fs = require("fs");

const { listImages, downloadFile } = require("./driveService");
const { uploadToS3 } = require("./s3Service");
const { saveImage } = require("./dbService");

// 🔴 PUT YOUR REAL GOOGLE DRIVE FOLDER ID HERE
const FOLDER_ID = "1U7_L43KyauzMpG-daEqBVae9i5u6mo4p";

async function startWorker() {
  console.log("Worker starting...");
  console.log("Testing Google Drive access...");

  const images = await listImages(FOLDER_ID);
  console.log(`Found ${images.length} images`);

  const downloadsDir = path.join(__dirname, "downloads");

  if (!fs.existsSync(downloadsDir)) {
    fs.mkdirSync(downloadsDir, { recursive: true });
  }

  for (const image of images) {
    const localFilePath = path.join(downloadsDir, image.name);

    console.log("Downloading:", image.name);
    await downloadFile(image.id, localFilePath);

    console.log("Uploading to MinIO:", image.name);
    const s3Url = await uploadToS3(localFilePath, image.name);

    console.log("Uploaded:", s3Url);

    await saveImage({
      name: image.name,
      s3Url,
      size: image.size,
      mimeType: image.mimeType,
    });

    console.log("Saved metadata to DB");
  }
}

startWorker().catch((err) => {
  console.error("Worker failed:", err);
});
