const AWS = require("aws-sdk");
const fs = require("fs");

const s3 = new AWS.S3({
  endpoint: "http://localhost:9000",
  accessKeyId: "minioadmin",
  secretAccessKey: "minioadmin",
  s3ForcePathStyle: true,
  signatureVersion: "v4",
});

async function uploadToS3(filePath, key) {
  const fileStream = fs.createReadStream(filePath);

  await s3
    .upload({
      Bucket: "images",
      Key: key,
      Body: fileStream,
      ACL: "public-read",
    })
    .promise();

  return `http://localhost:9000/images/${key}`;
}

module.exports = { uploadToS3 };
