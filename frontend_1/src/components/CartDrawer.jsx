import React, { useState } from 'react';
import { X, Minus, Plus, Trash2, Copy, Check, QrCode } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { createOrder, verifyUpiPayment } from '../api/api.js';

const UPI_ID = 'thefarmerstory@upi';

const STEPS = {
  CART: 'cart',
  ADDRESS: 'address',
  PAYMENT: 'payment',
  SUCCESS: 'success',
};

const initialAddress = {
  fullName: '',
  phone: '',
  line1: '',
  line2: '',
  city: '',
  state: '',
  pincode: '',
};

export default function CartDrawer() {
  const { items, updateQuantity, removeItem, subtotal, shippingFee, total, isOpen, setIsOpen, clearCart } = useCart();

  const [step, setStep] = useState(STEPS.CART);
  const [address, setAddress] = useState(initialAddress);
  const [order, setOrder] = useState(null);
  const [utr, setUtr] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  function close() {
    setIsOpen(false);
    // Reset flow slightly after close animation so it doesn't flash mid-close
    setTimeout(() => {
      if (step === STEPS.SUCCESS) {
        setStep(STEPS.CART);
        setOrder(null);
        setUtr('');
        setAddress(initialAddress);
      }
    }, 300);
  }

  async function handlePlaceOrder(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const payload = {
        items: items.map((i) => ({ name: i.name, price: i.price, quantity: i.quantity })),
        shippingAddress: address,
        paymentMethod: 'upi',
      };
      const data = await createOrder(payload);
      setOrder(data.order);
      setStep(STEPS.PAYMENT);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not create your order. Please check the form and try again.');
    } finally {
      setLoading(false);
    }
  }

  async function handleVerifyPayment(e) {
    e.preventDefault();
    setError('');
    if (!utr.trim()) {
      setError('Please enter your UPI transaction reference (UTR).');
      return;
    }
    setLoading(true);
    try {
      await verifyUpiPayment({ orderId: order._id, utr });
      setStep(STEPS.SUCCESS);
      clearCart();
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not verify payment. Please double-check the UTR.');
    } finally {
      setLoading(false);
    }
  }

  function copyUpiId() {
    navigator.clipboard.writeText(UPI_ID).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-brown/40 backdrop-blur-sm" onClick={close} />

      <div className="relative w-full max-w-md h-full bg-cream shadow-soft flex flex-col">
        <div className="flex items-center justify-between px-6 py-5 border-b border-brown/10">
          <h3 className="font-serif text-xl">
            {step === STEPS.CART && 'Your Cart'}
            {step === STEPS.ADDRESS && 'Shipping Details'}
            {step === STEPS.PAYMENT && 'Pay via UPI'}
            {step === STEPS.SUCCESS && 'Order Confirmed'}
          </h3>
          <button onClick={close} aria-label="Close cart" className="text-brown/60 hover:text-brown">
            <X size={22} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-6">
          {/* --- STEP: CART --- */}
          {step === STEPS.CART && (
            <>
              {items.length === 0 ? (
                <p className="text-brown/50 text-sm mt-10 text-center">Your cart is empty.</p>
              ) : (
                <div className="space-y-5">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 border-b border-brown/10 pb-5">
                      <div className="w-14 h-16 rounded-lg bg-gradient-to-b from-[#8C6A52] to-[#6B4E37] flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{item.name}</p>
                        <p className="text-brown/50 text-sm">₹{item.price}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 rounded-full border border-brown/20 flex items-center justify-center"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="w-6 text-center text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 rounded-full border border-brown/20 flex items-center justify-center"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-brown/40 hover:text-red-500">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}

          {/* --- STEP: ADDRESS --- */}
          {step === STEPS.ADDRESS && (
            <form id="address-form" onSubmit={handlePlaceOrder} className="space-y-4">
              <Field label="Full name" value={address.fullName} onChange={(v) => setAddress((a) => ({ ...a, fullName: v }))} required />
              <Field label="Phone number" value={address.phone} onChange={(v) => setAddress((a) => ({ ...a, phone: v }))} required />
              <Field label="Address line 1" value={address.line1} onChange={(v) => setAddress((a) => ({ ...a, line1: v }))} required />
              <Field label="Address line 2 (optional)" value={address.line2} onChange={(v) => setAddress((a) => ({ ...a, line2: v }))} />
              <div className="grid grid-cols-2 gap-4">
                <Field label="City" value={address.city} onChange={(v) => setAddress((a) => ({ ...a, city: v }))} required />
                <Field label="State" value={address.state} onChange={(v) => setAddress((a) => ({ ...a, state: v }))} required />
              </div>
              <Field label="Pincode" value={address.pincode} onChange={(v) => setAddress((a) => ({ ...a, pincode: v }))} required />
              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          )}

          {/* --- STEP: PAYMENT --- */}
          {step === STEPS.PAYMENT && order && (
            <div className="space-y-6">
              <div className="bg-white/60 border border-brown/10 rounded-2xl p-6 text-center">
                <div className="w-40 h-40 mx-auto rounded-xl border-2 border-dashed border-brown/20 flex items-center justify-center mb-4">
                  <QrCode size={72} className="text-brown/30" />
                </div>
                <p className="text-xs text-brown/50 mb-1">Scan with any UPI app (Google Pay, PhonePe, Paytm)</p>
                <p className="font-serif text-2xl mb-4">₹{order.total}</p>

                <div className="flex items-center justify-center gap-2 bg-cream rounded-full border border-brown/15 px-4 py-2 mx-auto w-fit">
                  <span className="text-sm font-medium">{UPI_ID}</span>
                  <button onClick={copyUpiId} aria-label="Copy UPI ID" className="text-olive">
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
              </div>

              <form onSubmit={handleVerifyPayment} className="space-y-3">
                <Field
                  label="UPI Transaction ID / UTR"
                  value={utr}
                  onChange={setUtr}
                  required
                  placeholder="e.g. 402917465123"
                />
                <p className="text-xs text-brown/50">
                  After paying, enter the UTR number from your payment app so we can verify and confirm your order.
                </p>
                {error && <p className="text-sm text-red-600">{error}</p>}
              </form>
            </div>
          )}

          {/* --- STEP: SUCCESS --- */}
          {step === STEPS.SUCCESS && (
            <div className="text-center mt-10">
              <div className="w-16 h-16 rounded-full bg-olive/10 flex items-center justify-center mx-auto mb-5">
                <Check size={28} className="text-olive" />
              </div>
              <h4 className="font-serif text-xl mb-2">Thank you for your order!</h4>
              <p className="text-sm text-brown/60 mb-1">Order ID: {order?._id}</p>
              <p className="text-sm text-brown/60">
                We'll verify your payment and send updates to <strong>order.thefarmerstory@gmail.com</strong> shortly.
              </p>
            </div>
          )}
        </div>

        {/* Footer: totals + actions */}
        {step !== STEPS.SUCCESS && (
          <div className="border-t border-brown/10 px-6 py-5 space-y-3">
            <div className="flex justify-between text-sm text-brown/60">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-sm text-brown/60">
              <span>Shipping</span>
              <span>{shippingFee === 0 ? 'Free' : `₹${shippingFee}`}</span>
            </div>
            <div className="flex justify-between font-medium text-lg">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            {step === STEPS.CART && (
              <button
                disabled={items.length === 0}
                onClick={() => setStep(STEPS.ADDRESS)}
                className="btn-primary w-full disabled:opacity-50"
              >
                Proceed to checkout
              </button>
            )}
            {step === STEPS.ADDRESS && (
              <div className="flex gap-3">
                <button onClick={() => setStep(STEPS.CART)} className="btn-secondary flex-1">
                  Back
                </button>
                <button form="address-form" type="submit" disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                  {loading ? 'Placing order…' : 'Continue to payment'}
                </button>
              </div>
            )}
            {step === STEPS.PAYMENT && (
              <div className="flex gap-3">
                <button onClick={() => setStep(STEPS.ADDRESS)} className="btn-secondary flex-1">
                  Back
                </button>
                <button onClick={handleVerifyPayment} disabled={loading} className="btn-primary flex-1 disabled:opacity-60">
                  {loading ? 'Verifying…' : "I've paid"}
                </button>
              </div>
            )}
          </div>
        )}

        {step === STEPS.SUCCESS && (
          <div className="border-t border-brown/10 px-6 py-5">
            <button onClick={close} className="btn-primary w-full">
              Continue shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function Field({ label, value, onChange, required, placeholder }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-wide text-brown/60">{label}</label>
      <input
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 w-full rounded-lg border border-brown/20 bg-white/60 px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-gold"
      />
    </div>
  );
}
