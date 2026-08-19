import React, { useState } from 'react';
import { ShoppingBag, User, Menu, X, Leaf } from 'lucide-react';
import { useCart } from '../context/CartContext.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function Navbar({ onOpenAuth }) {
  const { itemCount, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const links = [
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'The Story', href: '#story' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'FAQs', href: '#faqs' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-cream/90 backdrop-blur border-b border-brown/10">
      <nav className="max-w-7xl mx-auto px-5 md:px-8 h-20 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2">
          <span className="w-9 h-9 rounded-full border border-brown flex items-center justify-center">
            <Leaf size={16} className="text-olive" />
          </span>
          <span className="font-serif text-lg tracking-wide">
            The Farmer&apos;s <span className="italic">Story</span>
          </span>
        </a>

        <div className="hidden md:flex items-center gap-8 text-sm tracking-wide">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-olive transition-colors">
              {l.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="hidden sm:flex items-center gap-3 text-sm">
              <span className="text-brown/70">Hi, {user.name.split(' ')[0]}</span>
              <button onClick={logout} className="underline hover:text-olive">
                Log out
              </button>
            </div>
          ) : (
            <button
              onClick={onOpenAuth}
              className="hidden sm:inline-flex items-center gap-2 text-sm hover:text-olive transition-colors"
            >
              <User size={18} />
              Login / Register
            </button>
          )}

          <button
            onClick={() => setIsOpen(true)}
            aria-label="Open cart"
            className="relative w-10 h-10 rounded-full border border-brown/20 flex items-center justify-center hover:bg-brown hover:text-cream transition-colors"
          >
            <ShoppingBag size={18} />
            {itemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-gold text-brown text-[11px] font-semibold flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </button>

          <button
            className="md:hidden w-10 h-10 flex items-center justify-center"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="md:hidden border-t border-brown/10 px-5 py-4 flex flex-col gap-4 bg-cream">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-sm">
              {l.label}
            </a>
          ))}
          {user ? (
            <button onClick={logout} className="text-sm text-left underline">
              Log out ({user.name.split(' ')[0]})
            </button>
          ) : (
            <button onClick={onOpenAuth} className="text-sm text-left flex items-center gap-2">
              <User size={16} /> Login / Register
            </button>
          )}
        </div>
      )}
    </header>
  );
}
