import express from 'express';
import multerConfig from '../config/multerConfig.js';

const router = express.Router();

router.post('/upload-image', multerConfig.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
  res.json({ message: 'Images uploaded successfully', imageUrls });
});

export default router;
