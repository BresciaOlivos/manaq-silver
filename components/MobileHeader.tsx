"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import MobileMenuDrawer  from "@/components/MobileMenuDrawer";

function Icon({
  name,
  className = "h-5 w-5",
}: {
  name: "search" | "user" | "bag" | "menu";
  className?: string;
}) {
  const common = {
    className,
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "search")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <circle cx="11" cy="11" r="7" />
        <path d="M20 20l-3.2-3.2" />
      </svg>
    );

  if (name === "user")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M20 21a8 8 0 0 0-16 0" />
        <circle cx="12" cy="8" r="4" />
      </svg>
    );

  if (name === "bag")
    return (
      <svg viewBox="0 0 24 24" {...common}>
        <path d="M6 8h12l-1 13H7L6 8z" />
        <path d="M9 8a3 3 0 0 1 6 0" />
      </svg>
    );

  return (
    <svg viewBox="0 0 24 24" {...common}>
      <path d="M5 7h14" />
      <path d="M5 12h14" />
      <path d="M5 17h14" />
    </svg>
  );
}

export default function MobileHeader({ locale }: { locale: "de" | "en" }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const t = {
    brand: "Manaq Silver",
    search: locale === "de" ? "Suche" : "Search",
    account: locale === "de" ? "Konto" : "Account",
    cart: locale === "de" ? "Warenkorb" : "Cart",
    menu: locale === "de" ? "Menü" : "Menu",
  };

  return (
    <>
      <header
        className={[
          "sticky top-0 z-50 transition-colors",
          scrolled
            ? "border-b bg-white/90 backdrop-blur"
            : "border-b border-white/10 bg-black/20 backdrop-blur",
        ].join(" ")}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <Link href={`/${locale}`} className="flex items-center gap-2" aria-label={t.brand}>
            {/* Logo pill so black logo stays visible even on dark hero */}
            <div className="relative h-9 w-9 overflow-hidden rounded-full border border-black/10 bg-white/85 backdrop-blur">
              <Image
                src="/images/brand/logo-black.png"
                alt="Manaq"
                fill
                sizes="36px"
                className="object-contain p-1"
              />
            </div>

            <div className="leading-tight">
              <div
                className={[
                  "text-[12px] font-semibold tracking-[0.30em] uppercase",
                  scrolled ? "text-neutral-900" : "text-white",
                ].join(" ")}
              >
                Manaq
              </div>
              <div
                className={[
                  "text-[10px] tracking-[0.30em] uppercase",
                  scrolled ? "text-neutral-600" : "text-white/70",
                ].join(" ")}
              >
                Silver • 950
              </div>
            </div>
          </Link>

          <div className="flex items-center gap-1">
            <Link
              href={`/${locale}/search`}
              className={[
                "h-10 w-10 inline-flex items-center justify-center rounded-full transition",
                scrolled ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10",
              ].join(" ")}
              aria-label={t.search}
              title={t.search}
            >
              <Icon name="search" />
            </Link>

            <Link
              href={`/${locale}/account`}
              className={[
                "h-10 w-10 inline-flex items-center justify-center rounded-full transition",
                scrolled ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10",
              ].join(" ")}
              aria-label={t.account}
              title={t.account}
            >
              <Icon name="user" />
            </Link>

            <Link
              href={`/${locale}/cart`}
              className={[
                "h-10 w-10 inline-flex items-center justify-center rounded-full transition",
                scrolled ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10",
              ].join(" ")}
              aria-label={t.cart}
              title={t.cart}
            >
              <Icon name="bag" />
            </Link>

            <button
              type="button"
              onClick={() => setOpen(true)}
              className={[
                "h-10 w-10 inline-flex items-center justify-center rounded-full transition",
                scrolled ? "text-neutral-900 hover:bg-neutral-100" : "text-white hover:bg-white/10",
              ].join(" ")}
              aria-label={t.menu}
              title={t.menu}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenuDrawer locale={locale} open={open} onClose={() => setOpen(false)} />
    </>
  );
}