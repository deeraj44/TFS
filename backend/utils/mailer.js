const nodemailer = require('nodemailer');

// In development (no SMTP creds configured) this simply logs the email
// instead of sending it, so the app runs out of the box without real
// credentials. Configure SMTP_* in .env to send real emails.
function buildTransport() {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    return null;
  }
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT) || 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

const transporter = buildTransport();

/**
 * Sends (or mock-logs) an order confirmation email to the merchant inbox.
 */
async function sendOrderNotification(order) {
  const to = process.env.ORDER_NOTIFY_EMAIL || 'order.thefarmerstory@gmail.com';

  const itemsList = order.items
    .map((i) => `  - ${i.name} x${i.quantity} @ ₹${i.price} = ₹${i.price * i.quantity}`)
    .join('\n');

  const subject = `New Order #${order._id} — ₹${order.total}`;
  const text = `A new order has been placed on The Farmer's Story.

Order ID: ${order._id}
Payment method: ${order.paymentMethod.toUpperCase()}
Payment status: ${order.paymentStatus}
UPI Ref: ${order.upiTransactionRef || 'N/A'}

Items:
${itemsList}

Subtotal: ₹${order.subtotal}
Shipping: ₹${order.shippingFee}
Total: ₹${order.total}

Ship to:
${order.shippingAddress.fullName}
${order.shippingAddress.line1} ${order.shippingAddress.line2 || ''}
${order.shippingAddress.city}, ${order.shippingAddress.state} ${order.shippingAddress.pincode}
${order.shippingAddress.country}
Phone: ${order.shippingAddress.phone}
`;

  if (!transporter) {
    // Mock mode — no SMTP credentials configured.
    console.log('--- [MOCK EMAIL] Order notification ---');
    console.log('To:', to);
    console.log('Subject:', subject);
    console.log(text);
    console.log('--- end mock email ---');
    return { mocked: true };
  }

  await transporter.sendMail({
    from: `"The Farmer's Story" <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
  });

  return { mocked: false };
}

module.exports = { sendOrderNotification };
