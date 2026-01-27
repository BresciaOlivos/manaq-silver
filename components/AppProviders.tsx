"use client";

import { CartProvider } from "./CartProvider";
import { ReservationJanitor } from "./ReservationJanitor";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <ReservationJanitor />
      {children}
    </CartProvider>
  );
}
