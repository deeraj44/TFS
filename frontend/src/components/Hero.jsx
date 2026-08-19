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
          {product.mrp > product.price && (
            <>
              <span className="text-brown/40 line-through text-lg">₹{product.mrp}</span>
              <span className="text-olive text-sm font-medium">{discountPct}% off</span>
            </>
          )}
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

        <div className="flex flex-wrap items-center gap-3 mb-8">
          <a
            href="https://www.amazon.in/Farmers-Story-Exfoliating-Cleansing-Sandalwood/dp/B0HFDL78QL"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brown/20 rounded-full pl-4 pr-5 py-2.5 text-sm font-medium bg-white shadow-sm hover:shadow-md hover:border-brown/40 hover:-translate-y-0.5 transition-all"
          >
            <AmazonMark className="h-5 w-auto" />
            <span className="text-brown">Buy from Amazon</span>
          </a>

          <a
            href="https://wa.me/919619501515"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brown/20 rounded-full pl-4 pr-5 py-2.5 text-sm font-medium hover:bg-[#25D366] hover:border-[#25D366] hover:text-white transition-colors"
          >
            <WhatsAppIcon className="h-5 w-5" />
            WhatsApp Us
          </a>

          <a
            href="https://www.instagram.com/the_farmers_story?igsh=Y2UzZ2dvbXdob2Y4&igsi=Y2UzZ2dvbXdob2Y4"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-brown/20 rounded-full pl-4 pr-5 py-2.5 text-sm font-medium hover:text-white transition-colors hover:border-transparent hover:[background:radial-gradient(circle_at_30%_107%,#fdf497_0%,#fdf497_5%,#fd5949_45%,#d6249f_60%,#285AEB_90%)]"
          >
            <InstagramIcon className="h-5 w-5" />
            Follow us
          </a>
        </div>

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

// Clean inline rendering of the amazon wordmark + smile-arrow, used only
// as a link icon that points to the brand's real Amazon listing.
function AmazonMark({ className = '' }) {
  return (
    <svg viewBox="0 0 90 32" className={className} xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <text
        x="0"
        y="20"
        fontFamily="Arial, Helvetica, sans-serif"
        fontWeight="700"
        fontSize="19"
        letterSpacing="-0.3"
        fill="#131921"
      >
        amazon
      </text>
      <path
        d="M2 24.5c11.5 6.8 34 9 52.5 3.3a63 63 0 0 0 15.8-7.3c1-.6 1.9.5 1 1.3a48 48 0 0 1-15.8 8.6c-14.5 4.6-30.6 2.7-42.3-3.6-1-.5-1.9-1.6-.7-2.2Z"
        fill="#FF9900"
      />
      <path
        d="M67.5 20.2c1.9-.2 6.2-.7 7 .3.8 1-1 5.4-1.8 7.4-.2.6.3.8.8.4 3.4-2.9 4.3-8.8 3.6-9.7-.7-.9-6.5-1.6-10.1.9-.6.4-.1 1 .5 1Z"
        fill="#FF9900"
      />
    </svg>
  );
}

function WhatsAppIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M17.5 14.4c-.3-.1-1.7-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.1-.1.2-.3.3-.4.1-.2 0-.4 0-.5 0-.1-.7-1.6-.9-2.2-.2-.5-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.4s1 2.8 1.2 3c.1.2 2.1 3.2 5 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.7-.7 2-1.4.2-.7.2-1.2.2-1.4-.1-.1-.3-.2-.6-.3Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5.1-1.3A10 10 0 0 0 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2Zm0 18.2c-1.7 0-3.4-.5-4.8-1.3l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 20.2 12 8.2 8.2 0 0 1 12 20.2Z"
      />
    </svg>
  );
}

function InstagramIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="1.8" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  );
}
