"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

type CartItem = { productId: string; qty: number };

type CartCtx = {
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  clear: () => void;
  setQty: (productId: string, qty: number) => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "manaq_cart_v1";

function safeParse(json: string | null): CartItem[] {
  if (!json) return [];
  try {
    const arr = JSON.parse(json);
    if (!Array.isArray(arr)) return [];
    return arr
      .map((x) => ({
        productId: String(x?.productId ?? "").trim(),
        qty: Math.max(1, Number(x?.qty ?? 1)),
      }))
      .filter((x) => x.productId);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  // Load once on mount
  useEffect(() => {
    setItems(safeParse(localStorage.getItem(STORAGE_KEY)));
  }, []);

  // Persist on change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo<CartCtx>(() => {
    return {
      items,

      add: (productId, qty = 1) => {
        const id = String(productId).trim();
        if (!id) return;

        setItems((prev) => {
          const copy = [...prev];
          const idx = copy.findIndex((x) => x.productId === id);
          if (idx >= 0) {
            copy[idx] = { ...copy[idx], qty: copy[idx].qty + Math.max(1, qty) };
            return copy;
          }
          return [...copy, { productId: id, qty: Math.max(1, qty) }];
        });
      },

      remove: (productId) => {
        const id = String(productId).trim();
        if (!id) return;
        setItems((prev) => prev.filter((x) => x.productId !== id));
      },

      clear: () => setItems([]),

      setQty: (productId, qty) => {
        const id = String(productId).trim();
        const q = Math.max(1, Number(qty || 1));
        if (!id) return;

        setItems((prev) =>
          prev.map((x) => (x.productId === id ? { ...x, qty: q } : x))
        );
      },
    };
  }, [items]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}