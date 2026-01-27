"use client";

import { CartProvider } from "@/components/CartProvider";
import { ReservationJanitor } from "@/components/ReservationJanitor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ReservationJanitor />
      {children}
    </CartProvider>
  );
}
