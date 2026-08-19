import React, { createContext, useContext, useMemo, useState } from 'react';

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 499;
const STANDARD_SHIPPING = 49;

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { id, name, price, quantity }
  const [isOpen, setIsOpen] = useState(false);

  function addItem(product, quantity = 1) {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { id: product.id, name: product.name, price: product.price, quantity }];
    });
    setIsOpen(true);
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) {
      removeItem(id);
      return;
    }
    setItems((prev) => prev.map((i) => (i.id === id ? { ...i, quantity } : i)));
  }

  function removeItem(id) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);
  const shippingFee = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING;
  const total = subtotal + shippingFee;
  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQuantity,
        removeItem,
        clearCart,
        subtotal,
        shippingFee,
        total,
        itemCount,
        isOpen,
        setIsOpen,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
}
