const mongoose = require('mongoose');

const ReviewSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      default: 'instant-glow-scrubbing-soap',
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false, // guest reviews allowed, but tied to an account if logged in
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 80,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, 'Review comment is required'],
      trim: true,
      maxlength: 1000,
    },
    approved: {
      type: Boolean,
      default: true, // auto-approve; flip to false if you want manual moderation
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Review', ReviewSchema);
