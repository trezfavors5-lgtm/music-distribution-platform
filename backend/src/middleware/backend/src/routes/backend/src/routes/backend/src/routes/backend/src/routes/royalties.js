const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

router.post('/calculate', authenticate, (req, res) => {
  try {
    const { streams, artistPercentage, labelPercentage, producerPercentage } = req.body;
    const total = artistPercentage + labelPercentage + producerPercentage;
    if (Math.abs(total - 100) > 0.01) return res.status(400).json({ error: 'Percentages must sum to 100' });
    
    const ratePerStream = 0.004;
    const totalRevenue = streams * ratePerStream;
    const breakdown = {
      totalStreams: streams,
      totalRevenue: parseFloat(totalRevenue.toFixed(2)),
      splits: {
        artist: parseFloat((totalRevenue * (artistPercentage / 100)).toFixed(2)),
        label: parseFloat((totalRevenue * (labelPercentage / 100)).toFixed(2)),
        producer: parseFloat((totalRevenue * (producerPercentage / 100)).toFixed(2))
      }
    };
    res.json(breakdown);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
