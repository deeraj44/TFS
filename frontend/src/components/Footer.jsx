import React from 'react';
import { Leaf, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brown text-cream">
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-16 grid md:grid-cols-3 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <span className="w-9 h-9 rounded-full border border-cream/40 flex items-center justify-center">
              <Leaf size={16} />
            </span>
            <span className="font-serif text-lg">The Farmer&apos;s Story</span>
          </div>
          <p className="text-cream/60 text-sm leading-relaxed max-w-xs">
            Born from the belief that skincare should be as honest as the earth it comes from — small-batch,
            naturally sourced, and free of anything your skin doesn't need.
          </p>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide text-cream/50 mb-4">Explore</h4>
          <ul className="space-y-3 text-sm text-cream/80">
            <li><a href="#top" className="hover:text-gold">Shop</a></li>
            <li><a href="#ingredients" className="hover:text-gold">Ingredients</a></li>
            <li><a href="#story" className="hover:text-gold">Our Story</a></li>
            <li><a href="#reviews" className="hover:text-gold">Reviews</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm uppercase tracking-wide text-cream/50 mb-4">Support</h4>
          <p className="flex items-center gap-2 text-sm text-cream/80 mb-2">
            <Mail size={16} className="text-gold" />
            <a href="mailto:order.thefarmerstory@gmail.com" className="hover:text-gold">
              order.thefarmerstory@gmail.com
            </a>
          </p>
          <p className="text-cream/50 text-xs">We usually reply within 24 hours.</p>
        </div>
      </div>

      <div className="border-t border-cream/10 py-6 text-center text-xs text-cream/40">
        © {new Date().getFullYear()} The Farmer&apos;s Story. All rights reserved.
      </div>
    </footer>
  );
}
