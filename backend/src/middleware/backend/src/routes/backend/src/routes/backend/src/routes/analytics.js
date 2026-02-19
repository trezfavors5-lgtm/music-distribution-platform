const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

function generateMockAnalytics() {
  const data = [];
  for (let i = 90; i > 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    data.push({
      date: date.toISOString().split('T')[0],
      streams: Math.floor(Math.random() * 5000) + 1000,
      revenue: parseFloat((Math.random() * 25 + 5).toFixed(2))
    });
  }
  return data;
}

router.get('/dashboard', authenticate, (req, res) => {
  try {
    const stats = {
      totalReleases: Math.floor(Math.random() * 50) + 5,
      totalStreams: Math.floor(Math.random() * 1000000) + 10000,
      totalRevenue: parseFloat((Math.random() * 50000 + 1000).toFixed(2))
    };
    stats.averageRevenuePerStream = (stats.totalRevenue / stats.totalStreams).toFixed(5);
    res.json({ stats, growthData: generateMockAnalytics() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
