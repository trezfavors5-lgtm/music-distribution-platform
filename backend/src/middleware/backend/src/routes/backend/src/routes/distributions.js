const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const DSP_LIST = ['spotify', 'apple_music', 'amazon_music', 'tidal', 'deezer', 'youtube_music', 'tiktok', 'instagram'];
const distributions = [];

router.post('/', authenticate, (req, res) => {
  try {
    const { releaseId, platforms, territories } = req.body;
    if (!releaseId || !platforms || platforms.length === 0) return res.status(400).json({ error: 'Missing fields' });
    
    const distribution = {
      id: Date.now().toString(),
      releaseId, userId: req.userId,
      platforms: platforms.map(p => ({ platform: p, enabled: true, status: 'pending' })),
      territories: territories || ['WORLDWIDE'],
      status: 'PENDING', createdAt: new Date()
    };
    distributions.push(distribution);
    res.status(201).json({ message: 'Distribution created', distribution });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticate, (req, res) => {
  try {
    const userDistributions = distributions.filter(d => d.userId === req.userId);
    res.json(userDistributions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/dsps/list', (req, res) => {
  res.json({
    platforms: DSP_LIST.map(p => ({
      id: p,
      name: p.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' '),
      enabled: true
    }))
  });
});

module.exports = router;
