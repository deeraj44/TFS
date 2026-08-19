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
        <div className="relative rounded-[2rem] bg-white/50 border border-brown/10 p-10 shadow-soft flex items-center justify-center aspect-square">
          <div className="w-40 h-52 md:w-48 md:h-64 rounded-xl bg-gradient-to-b from-[#8C6A52] to-[#6B4E37] shadow-xl relative flex items-center justify-center">
            <div className="w-16 h-16 rounded-full border-2 border-cream/70 flex items-center justify-center">
              <Leaf className="text-cream/80" size={22} />
            </div>
          </div>
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
