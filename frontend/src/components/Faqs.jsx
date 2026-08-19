import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: 'Is this soap suitable for sensitive skin?',
    a: 'Yes — Instant Glow is formulated for all skin types. If you have very reactive skin, we recommend a small patch test first.',
  },
  {
    q: 'How often should I use it?',
    a: 'Use it 3–4 times a week as part of your cleansing routine. Daily use is fine for oily or combination skin.',
  },
  {
    q: 'How do I pay?',
    a: 'We currently accept UPI payments (Google Pay, PhonePe, Paytm) and Cash on Delivery on eligible orders.',
  },
  {
    q: 'How long does delivery take?',
    a: 'Most orders are dispatched within 24–48 hours and delivered within 4–7 business days depending on your location.',
  },
];

export default function Faqs() {
  const [open, setOpen] = useState(0);

  return (
    <section id="faqs" className="max-w-3xl mx-auto px-5 md:px-8 py-20">
      <h2 className="text-3xl font-bold text-center mb-10">Frequently asked questions</h2>
      <div className="space-y-3">
        {FAQS.map((item, idx) => (
          <div key={item.q} className="border border-brown/10 rounded-xl bg-white/40 overflow-hidden">
            <button
              onClick={() => setOpen(open === idx ? -1 : idx)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span className="font-medium">{item.q}</span>
              <ChevronDown
                size={18}
                className={`transition-transform ${open === idx ? 'rotate-180' : ''}`}
              />
            </button>
            {open === idx && <p className="px-5 pb-4 text-sm text-brown/60">{item.a}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}
