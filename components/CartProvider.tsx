"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

export type CartItem = { productId: string; qty: number };

type CartCtx = {
  ready: boolean;
  items: CartItem[];
  add: (productId: string, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartCtx | null>(null);

const STORAGE_KEY = "manaq_cart_v1";

function safeParse(json: string | null): CartItem[] {
  if (!json) return [];
  try {
    const v = JSON.parse(json);
    if (!Array.isArray(v)) return [];
    return v
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
  const [ready, setReady] = useState(false);
  const [items, setItems] = useState<CartItem[]>([]);

  // load once
  useEffect(() => {
    const stored = safeParse(typeof window !== "undefined" ? localStorage.getItem(STORAGE_KEY) : null);
    setItems(stored);
    setReady(true);
  }, []);

  // persist
  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, ready]);

  const api = useMemo<CartCtx>(() => {
    return {
      ready,
      items,

      add(productId, qty = 1) {
        const id = String(productId ?? "").trim();
        if (!id) return;

        const q = Math.max(1, Number(qty));
        setItems((prev) => {
          const idx = prev.findIndex((x) => x.productId === id);
          if (idx === -1) return [...prev, { productId: id, qty: q }];
          const next = [...prev];
          next[idx] = { productId: id, qty: next[idx].qty + q };
          return next;
        });
      },

      remove(productId) {
        const id = String(productId ?? "").trim();
        if (!id) return;
        setItems((prev) => prev.filter((x) => x.productId !== id));
      },

      setQty(productId, qty) {
        const id = String(productId ?? "").trim();
        if (!id) return;
        const q = Math.max(1, Number(qty));
        setItems((prev) =>
          prev.map((x) => (x.productId === id ? { ...x, qty: q } : x))
        );
      },

      clear() {
        setItems([]);
      },
    };
  }, [items, ready]);

  return <CartContext.Provider value={api}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}