const express = require('express');
const router = express.Router();
const Traffic = require('../models/traffic');
const { Sequelize } = require('sequelize'); // Add this line
const sequelize = require('../config/Database');

// Route for generating a coupon
router.post('/generate-coupon', async (req, res) => {
  const { source } = req.body;

  try {
    const newCoupon = await Traffic.createCoupon(source);
    res.json({ token: newCoupon.token });
  } catch (err) {
    console.error('Error generating coupon:', err);
    res.status(500).json({ error: 'Failed to generate coupon' });
  }
});

// Route for redeeming a coupon
router.post('/redeem-coupon', async (req, res) => {
  const { token } = req.body;

  try {
    const redeemedCoupon = await Traffic.redeemCoupon(token);
    if (redeemedCoupon) {
      res.json({ success: true, message: 'Coupon redeemed successfully!' });
    } else {
      res.json({ success: false, message: 'Invalid or already redeemed coupon.' });
    }
  } catch (err) {
    console.error('Error redeeming coupon:', err);
    res.status(500).json({ error: 'Failed to redeem coupon' });
  }
});

// Route for getting traffic statistics
router.get('/traffic-stats', async (req, res) => {
  try {
    const stats = await Traffic.findAll({
      attributes: [
        'source',
        [Sequelize.fn('COUNT', Sequelize.col('source')), 'count']
      ],
      group: ['source']
    });
    res.json(stats);
  } catch (err) {
    console.error('Error retrieving traffic stats:', err);
    res.status(500).json({ error: 'Failed to retrieve traffic stats' });
  }
});

// Route for handling form submission
router.post('/submit-form', async (req, res) => {
  const { name, phoneNumber, problem, source } = req.body;

  try {
    // Handle form data here, e.g., save to database
    res.json({ success: true, message: 'Form submitted successfully!' });
  } catch (err) {
    console.error('Error submitting form:', err);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

module.exports = router;
