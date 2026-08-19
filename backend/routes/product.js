const express = require('express');
const router = express.Router();

// Static product data for the single-SKU brand. Swap this out for a
// Product Mongoose model if the catalog grows beyond one item.
const PRODUCT = {
  id: 'instant-glow-scrubbing-soap',
  name: 'Instant Glow Scrubbing Soap',
  tagline: "Nature's Touch For Your Best Skin",
  description:
    'A gentle exfoliating soap infused with Kojic Acid and Multani Mitti for brighter-looking, oil-free, smooth skin.',
  weight: '100 GM',
  grade: 'Grade 1',
  suitableFor: 'All Skin Types',
  price: 199,
  mrp: 199,
  currency: 'INR',
  inStock: true,
  benefits: [
    { title: 'Deep Cleansing', text: 'Removes dirt, impurities & unclogs pores' },
    { title: 'Oil Control', text: 'Reduces excess oil for fresh, matte skin' },
    { title: 'Brighter Looking Skin', text: 'Helps brighten & even out skin tone' },
    { title: 'Natural & Safe', text: 'Made with nourishing natural ingredients' },
  ],
  ingredients: [
    { name: 'Coconut Oil', text: 'Deeply nourishes & moisturizes' },
    { name: 'Almond Oil', text: 'Softens & soothes the skin' },
    { name: 'Multani Mitti', text: 'Detoxifies & cleanses pores' },
    { name: 'Mulethi Powder', text: 'Brightens & improves skin tone' },
    { name: 'Walnut Scrub Powder', text: 'Gently exfoliates & removes dead skin cells' },
    { name: 'Kojic Acid', text: 'Helps reduce dark spots & promotes even skin tone' },
  ],
  badges: ['Paraben Free', 'Sulphate Free', '100% Vegan', 'Cruelty Free'],
  shipping: {
    fastDelivery: true,
    cashOnDelivery: true,
    standardFee: 49,
    freeShippingThreshold: 499,
  },
};

// GET /api/product
router.get('/', (req, res) => {
  res.json({ success: true, product: PRODUCT });
});

module.exports = router;
