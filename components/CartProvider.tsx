"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = { productId: string };

type CartContextType = {
  items: CartItem[];
  add: (productId: string) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const raw = localStorage.getItem("manaq_cart");
    if (raw) setItems(JSON.parse(raw));
  }, []);

  useEffect(() => {
    localStorage.setItem("manaq_cart", JSON.stringify(items));
  }, [items]);

  const value = useMemo<CartContextType>(() => {
    return {
      items,
      add: (productId) =>
        setItems((prev) =>
          prev.some((x) => x.productId === productId) ? prev : [...prev, { productId }]
        ),
      remove: (productId) =>
        setItems((prev) => prev.filter((x) => x.productId !== productId)),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
