"use client";

import Link from "next/link";
import { useState } from "react";

export function MobileNav({
  locale,
  brand,
  nav,
}: {
  locale: "de" | "en";
  brand: string;
  nav: {
    earrings: string;
    necklaces: string;
    rings: string;
    sets: string;
    pendants: string;
    about: string;
    contact: string;
    cart: string;
  };
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden border-b bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <Link
          href={`/${locale}`}
          className="text-sm font-semibold tracking-[0.28em] uppercase"
        >
          {brand}
        </Link>

        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-xl border px-3 py-2 text-sm"
          aria-label="Open menu"
        >
          {open ? "×" : "☰"}
        </button>
      </div>

      {open && (
        <div className="mx-auto max-w-6xl px-4 pb-5 grid gap-2 text-sm">
          <NavLink locale={locale} href="earrings" label={nav.earrings} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="necklaces" label={nav.necklaces} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="rings" label={nav.rings} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="sets" label={nav.sets} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="pendants" label={nav.pendants} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="about" label={nav.about} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="contact" label={nav.contact} onClick={() => setOpen(false)} />
          <NavLink locale={locale} href="cart" label={nav.cart} onClick={() => setOpen(false)} />
        </div>
      )}
    </div>
  );
}

function NavLink({
  locale,
  href,
  label,
  onClick,
}: {
  locale: "de" | "en";
  href: string;
  label: string;
  onClick: () => void;
}) {
  return (
    <Link
      href={`/${locale}/${href}`}
      onClick={onClick}
      className="rounded-2xl border bg-white px-4 py-3 hover:bg-neutral-50"
    >
      {label}
    </Link>
  );
}