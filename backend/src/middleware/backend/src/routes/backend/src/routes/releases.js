const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const releases = [];

router.post('/', authenticate, (req, res) => {
  try {
    const { title, releaseDate, releaseType, artwork, upc, genres, tracks } = req.body;
    if (!title || !releaseDate || !releaseType || !upc || !tracks) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const release = {
      id: Date.now().toString(),
      title, releaseDate, releaseType,
      artwork: artwork || 'https://via.placeholder.com/3000x3000?text=Album',
      upc, genres: genres || [], tracks,
      artistId: req.userId, createdAt: new Date()
    };
    releases.push(release);
    res.status(201).json({ message: 'Release created successfully', release });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticate, (req, res) => {
  try {
    const userReleases = releases.filter(r => r.artistId === req.userId);
    res.json(userReleases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id', authenticate, (req, res) => {
  try {
    const release = releases.find(r => r.id === req.params.id);
    if (!release) return res.status(404).json({ error: 'Release not found' });
    if (release.artistId !== req.userId) return res.status(403).json({ error: 'Unauthorized' });
    res.json(release);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
