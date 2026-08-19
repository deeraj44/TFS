import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import Ingredients from './components/Ingredients.jsx';
import Story from './components/Story.jsx';
import Reviews from './components/Reviews.jsx';
import Faqs from './components/Faqs.jsx';
import Footer from './components/Footer.jsx';
import CartDrawer from './components/CartDrawer.jsx';
import AuthModal from './components/AuthModal.jsx';
import { fetchProduct } from './api/api.js';

export default function App() {
  const [product, setProduct] = useState(null);
  const [authOpen, setAuthOpen] = useState(false);

  useEffect(() => {
    fetchProduct()
      .then((data) => setProduct(data.product))
      .catch(() => setProduct(null));
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onOpenAuth={() => setAuthOpen(true)} />
      <main className="flex-1">
        <Hero product={product} />
        <Ingredients product={product} />
        <Story product={product} />
        <Reviews />
        <Faqs />
      </main>
      <Footer />

      <CartDrawer />
      <AuthModal isOpen={authOpen} onClose={() => setAuthOpen(false)} />
    </div>
  );
}
