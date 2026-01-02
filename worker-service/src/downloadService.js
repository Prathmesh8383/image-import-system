const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, "../../api-service/keys/google-drive.json"),
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

const drive = google.drive({ version: "v3", auth });

async function downloadFile(fileId, fileName) {
  const destDir = path.join(__dirname, "../tmp");

  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
  }

  const destPath = path.join(destDir, fileName);

  const res = await drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );

  return new Promise((resolve, reject) => {
    const stream = fs.createWriteStream(destPath);
    res.data
      .on("end", () => resolve(destPath))
      .on("error", reject)
      .pipe(stream);
  });
}

module.exports = { downloadFile };
