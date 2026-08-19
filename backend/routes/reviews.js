const express = require('express');
const { body, validationResult } = require('express-validator');
const Review = require('../models/Review');
const { optionalAuth } = require('../middleware/auth');

const router = express.Router();

// GET /api/reviews — public, returns approved reviews (newest first)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find({ approved: true }).sort({ createdAt: -1 }).limit(200);

    const count = reviews.length;
    const average = count ? reviews.reduce((sum, r) => sum + r.rating, 0) / count : 0;

    res.json({
      success: true,
      count,
      averageRating: Math.round(average * 10) / 10,
      reviews,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch reviews.', error: err.message });
  }
});

// POST /api/reviews — public (logged-in users get their name/id attached automatically)
router.post(
  '/',
  optionalAuth,
  [
    body('name').trim().notEmpty().withMessage('Name is required').isLength({ max: 80 }),
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ max: 1000 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { name, rating, comment } = req.body;

      const review = await Review.create({
        name: req.user ? req.user.name : name,
        rating,
        comment,
        user: req.user ? req.user._id : undefined,
        approved: true, // instantly visible per spec; set false to require moderation
      });

      res.status(201).json({ success: true, review });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not submit review.', error: err.message });
    }
  }
);

module.exports = router;
