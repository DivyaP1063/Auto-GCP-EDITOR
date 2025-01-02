// pages/api/projects/upload.js
import multer from 'multer';
import nextConnect from 'next-connect';
import { uploadToS3 } from '../../../lib/aws';
import { addProjectToDatabase } from '../../../lib/database';  // You can create this function later

const upload = multer({ storage: multer.memoryStorage() });
const handler = nextConnect();

handler.use(upload.single('file')); // Handles single file upload

handler.post(async (req, res) => {
  try {
    const { file } = req;
    const { name, users } = req.body;

    // Upload file to S3
    const s3Response = await uploadToS3(file, process.env.AWS_BUCKET_NAME, file.originalname);

    // Save project data in DB (in this case, it is a mock function; replace with actual DB logic)
    const project = await addProjectToDatabase({
      name,
      users: JSON.parse(users),  // Users will be passed as a JSON array
      fileUrl: s3Response.Location, // S3 file URL
    });

    res.status(200).json({ message: 'Project created successfully', project });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ message: 'Error uploading file', error: error.message });
  }
});

export default handler;
