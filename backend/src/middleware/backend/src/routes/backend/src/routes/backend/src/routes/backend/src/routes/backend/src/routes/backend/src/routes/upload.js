const express = require('express');
const router = express.Router();
const multer = require('multer');
const { authenticate } = require('../middleware/auth');

const storage = multer.memoryStorage();
const upload = multer({ storage, limits: { fileSize: 500 * 1024 * 1024 } });

router.post('/audio', authenticate, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const allowedFormats = ['audio/wav', 'audio/flac', 'audio/mpeg'];
    if (!allowedFormats.includes(req.file.mimetype)) return res.status(400).json({ error: 'Format not supported' });
    const url = `https://example.com/uploads/audio/${Date.now()}-${req.file.originalname}`;
    res.json({ message: 'Audio uploaded successfully', url, fileSize: req.file.size });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/artwork', authenticate, upload.single('file'), (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No file provided' });
    const allowedFormats = ['image/jpeg', 'image/png'];
    if (!allowedFormats.includes(req.file.mimetype)) return res.status(400).json({ error: 'Format not supported' });
    const url = `https://example.com/uploads/artwork/${Date.now()}-${req.file.originalname}`;
    res.json({ message: 'Artwork uploaded successfully', url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
