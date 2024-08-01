const express = require('express');
const router = express.Router();
const upload = require('../config/multerConfig');


router.post('/upload-image', upload.array('images', 10), (req, res) => {
  if (!req.files || req.files.length === 0) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imageUrls = req.files.map(file => `http://localhost:5000/uploads/${file.filename}`);
  res.json({ message: 'Images uploaded successfully', imageUrls });
});

module.exports = router;
