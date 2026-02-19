const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/auth');

const payments = [];

router.post('/withdraw', authenticate, (req, res) => {
  try {
    const { amount, method } = req.body;
    if (!amount || !method) return res.status(400).json({ error: 'Amount and method required' });
    if (amount < 50) return res.status(400).json({ error: 'Minimum withdrawal is $50' });
    
    const payment = { id: Date.now().toString(), amount: parseFloat(amount), method, userId: req.userId, status: 'PENDING', createdAt: new Date() };
    payments.push(payment);
    res.status(201).json({ message: 'Withdrawal request created', payment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', authenticate, (req, res) => {
  try {
    const userPayments = payments.filter(p => p.userId === req.userId);
    res.json(userPayments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
