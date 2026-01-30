"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, Search, ShoppingBag, User } from "lucide-react";
import { MobileMenuDrawer } from "@/components/MobileMenuDrawer";

export default function MobileHeader({ locale }: { locale: "de" | "en" }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden sticky top-0 z-40 bg-white/90 backdrop-blur border-b">
        <div className="px-4 py-3 flex items-center justify-between">
          {/* Left brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2">
            <div className="leading-none">
              <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
                Manaq
              </div>
              <div className="text-sm font-semibold tracking-tight text-neutral-900">
                Silver
              </div>
            </div>
          </Link>

          {/* Right icons */}
          <div className="flex items-center gap-1">
            <button
              aria-label="Search"
              onClick={() => alert("Search coming next")}
              className="rounded-full border p-2 hover:bg-neutral-50"
            >
              <Search className="h-5 w-5" />
            </button>

            <Link
              href={`/${locale}/account`}
              className="rounded-full border p-2 hover:bg-neutral-50"
              aria-label="Account"
            >
              <User className="h-5 w-5" />
            </Link>

            <Link
              href={`/${locale}/cart`}
              className="rounded-full border p-2 hover:bg-neutral-50"
              aria-label="Cart"
            >
              <ShoppingBag className="h-5 w-5" />
            </Link>

            <button
              aria-label="Menu"
              onClick={() => setOpen(true)}
              className="rounded-full border p-2 hover:bg-neutral-50"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer open={open} onClose={() => setOpen(false)} locale={locale} />
    </>
  );
}