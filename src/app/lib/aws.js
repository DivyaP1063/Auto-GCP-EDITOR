// lib/aws.js
import AWS from 'aws-sdk';

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',  // Change this to your region
});

const s3 = new AWS.S3();

export const uploadToS3 = async (file, bucketName, fileName) => {
  const params = {
    Bucket: bucketName,
    Key: fileName,
    Body: file.buffer,
    ContentType: file.mimetype,
    ACL: 'public-read',
  };

  return s3.upload(params).promise();
};
