const express = require('express');
const { body, validationResult } = require('express-validator');
const Order = require('../models/Order');
const { optionalAuth } = require('../middleware/auth');
const { sendOrderNotification } = require('../utils/mailer');

const router = express.Router();

// POST /api/orders — create a pending order
router.post(
  '/',
  optionalAuth,
  [
    body('items').isArray({ min: 1 }).withMessage('At least one item is required'),
    body('items.*.name').notEmpty(),
    body('items.*.price').isFloat({ gt: 0 }),
    body('items.*.quantity').isInt({ gt: 0 }),
    body('shippingAddress.fullName').notEmpty().withMessage('Full name is required'),
    body('shippingAddress.phone').notEmpty().withMessage('Phone number is required'),
    body('shippingAddress.line1').notEmpty().withMessage('Address line is required'),
    body('shippingAddress.city').notEmpty().withMessage('City is required'),
    body('shippingAddress.state').notEmpty().withMessage('State is required'),
    body('shippingAddress.pincode').notEmpty().withMessage('Pincode is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { items, shippingAddress, paymentMethod } = req.body;

      const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
      const freeShippingThreshold = 499;
      const shippingFee = subtotal >= freeShippingThreshold ? 0 : 49;
      const total = subtotal + shippingFee;

      const order = await Order.create({
        user: req.user ? req.user._id : undefined,
        items,
        shippingAddress,
        subtotal,
        shippingFee,
        total,
        paymentMethod: paymentMethod === 'cod' ? 'cod' : 'upi',
        paymentStatus: 'pending',
        orderStatus: 'pending',
      });

      res.status(201).json({
        success: true,
        order,
        upi: {
          id: process.env.UPI_ID || 'thefarmerstory@upi',
          amount: total,
          note: `Order ${order._id}`,
        },
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not create order.', error: err.message });
    }
  }
);

// POST /api/orders/verify-upi — customer submits UTR / transaction ref for merchant verification
router.post(
  '/verify-upi',
  [
    body('orderId').notEmpty().withMessage('orderId is required'),
    body('utr')
      .trim()
      .notEmpty()
      .withMessage('UTR / Transaction reference is required')
      .isLength({ min: 6, max: 40 })
      .withMessage('That does not look like a valid transaction reference'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const { orderId, utr } = req.body;

      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ success: false, message: 'Order not found.' });
      }

      order.upiTransactionRef = utr;
      order.paymentStatus = 'submitted'; // merchant will manually verify against bank statement
      order.orderStatus = 'confirmed';
      await order.save();

      // Fire-and-forget style notification; awaited here to surface failures in mock/dev mode.
      try {
        await sendOrderNotification(order);
        order.notifiedAt = new Date();
        await order.save();
      } catch (mailErr) {
        console.error('Order notification email failed:', mailErr.message);
      }

      res.json({
        success: true,
        message: 'Payment reference received. Your order is confirmed and will be verified within 24 hours.',
        order,
      });
    } catch (err) {
      res.status(500).json({ success: false, message: 'Could not verify payment.', error: err.message });
    }
  }
);

// GET /api/orders/:id — fetch a single order (for confirmation page / polling)
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found.' });
    res.json({ success: true, order });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Could not fetch order.', error: err.message });
  }
});

module.exports = router;
