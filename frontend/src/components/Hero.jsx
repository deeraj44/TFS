import React, { useState } from 'react';
import { Minus, Plus, Truck, ShieldCheck, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';

export default function Hero({ product }) {
  const { addItem, setIsOpen } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="max-w-7xl mx-auto px-5 md:px-8 py-24 animate-pulse">
        <div className="h-72 bg-brown/5 rounded-3xl" />
      </section>
    );
  }

  const discountPct = Math.round(((product.mrp - product.price) / product.mrp) * 100);

  function handleAddToCart() {
    addItem({ id: product.id, name: product.name, price: product.price }, qty);
  }

  function handleBuyNow() {
    addItem({ id: product.id, name: product.name, price: product.price }, qty);
    setIsOpen(true);
  }

  return (
    <section id="top" className="max-w-7xl mx-auto px-5 md:px-8 py-14 md:py-20 grid md:grid-cols-2 gap-12 items-center">
      {/* Visual side */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-gold/20 to-olive/10 blur-2xl" aria-hidden="true" />
        <div className="relative rounded-[2rem] bg-white/50 border border-brown/10 p-6 md:p-10 shadow-soft overflow-hidden aspect-square">
          <img
            src="/images/hero-product.jpg"
            alt="Instant Glow Scrubbing Soap box and bar with Kojic Acid serum"
            className="w-full h-full object-cover rounded-2xl"
            loading="eager"
          />
        </div>
        <span className="absolute top-4 left-4 bg-olive text-cream text-xs font-medium px-3 py-1.5 rounded-full">
          For All Skin Types
        </span>
      </div>

      {/* Content side */}
      <div>
        <p className="uppercase tracking-[0.2em] text-xs text-olive font-medium mb-3">
          Nature&apos;s touch for your best skin
        </p>
        <h1 className="text-4xl md:text-6xl font-bold leading-[1.05] mb-4">
          Instant<br />Glow
        </h1>
        <p className="text-brown/70 text-lg mb-6">{product.description}</p>

        <div className="flex items-center gap-3 text-sm text-brown/60 mb-6">
          <span>{product.weight}</span>
          <span className="w-1 h-1 rounded-full bg-brown/30" />
          <span>{product.grade}</span>
          <span className="w-1 h-1 rounded-full bg-brown/30" />
          <span>{product.suitableFor}</span>
        </div>

        <div className="flex items-baseline gap-3 mb-8">
          <span className="text-3xl font-serif font-semibold">₹{product.price}</span>
          <span className="text-brown/40 line-through text-lg">₹{product.mrp}</span>
          <span className="text-olive text-sm font-medium">{discountPct}% off</span>
        </div>

        <div className="flex flex-wrap items-center gap-4 mb-8">
          <div className="flex items-center border border-brown/20 rounded-full">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="w-10 h-10 flex items-center justify-center hover:text-olive"
              aria-label="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span className="w-8 text-center font-medium">{qty}</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="w-10 h-10 flex items-center justify-center hover:text-olive"
              aria-label="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>

          <button onClick={handleAddToCart} className="btn-secondary">
            Add to Cart
          </button>
          <button onClick={handleBuyNow} className="btn-primary">
            Buy Now
          </button>
        </div>

        <a
          href="https://www.amazon.in/Farmers-Story-Exfoliating-Cleansing-Sandalwood/dp/B0HFDL78QL"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 border border-brown/20 rounded-full px-5 py-2.5 mb-8 text-sm font-medium hover:bg-[#131921] hover:text-white hover:border-[#131921] transition-colors"
        >
          <AmazonMark className="w-[74px]" />
          <span>Buy from Amazon</span>
        </a>

        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm text-brown/60">
          <span className="flex items-center gap-2">
            <Truck size={16} className="text-olive" /> Fast delivery
          </span>
          <span className="flex items-center gap-2">
            <ShieldCheck size={16} className="text-olive" /> Cash on delivery
          </span>
          {product.badges?.map((b) => (
            <span key={b} className="flex items-center gap-2">
              <Leaf size={16} className="text-olive" /> {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// Minimal inline rendering of the "amazon" wordmark + smile arrow,
// used only as a link icon pointing to the real Amazon listing.
function AmazonMark({ className = '' }) {
  return (
    <svg viewBox="0 0 130 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text
        x="0"
        y="26"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="24"
        fill="currentColor"
      >
        amazon
      </text>
      <path
        d="M2 32c18 10 46 13 70 6 8-2 17-6 24-11.5 1.6-1.3-.2-3.2-2-2.3-9 4-19 7-29 8-16 1.6-33-1-45-6-1-.4-1.7.8-1 1.8Z"
        fill="#FF9900"
      />
      <path
        d="M92 24.5c2.6-1.9 6.4-2.9 9-1.9.5 3-1.2 6-3.6 7.7-.6.4-1.2.1-1-.6.7-2 .8-3.4.3-4-.4-.5-1.6-.4-3.6.6-.5.2-.9-.3-.4-.8"
        fill="#FF9900"
      />
    </svg>
  );
}
