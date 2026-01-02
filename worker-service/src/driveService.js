const { google } = require("googleapis");
const path = require("path");

// Path to your Google Drive service account key
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../api-service/keys/google-drive.json"),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

async function listImages(folderId) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields: "files(id, name, mimeType, size)",
  });
  return res.data.files;
}

async function downloadFile(fileId, destPath) {
  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return new Promise((resolve, reject) => {
    const fs = require("fs");
    const stream = fs.createWriteStream(destPath);
    res.data
      .on("end", resolve)
      .on("error", reject)
      .pipe(stream);
  });
}

module.exports = { listImages, downloadFile };
