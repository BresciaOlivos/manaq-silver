"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function MobileMenuDrawer({
  locale,
  open,
  onClose,
}: {
  locale: "de" | "en";
  open: boolean;
  onClose: () => void;
}) {
  // Close on ESC
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  // lock body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const de = locale === "de";

  const items = [
    { href: `/${locale}/sets`, label: de ? "Sets" : "Sets" },
    { href: `/${locale}/earrings`, label: de ? "Ohrringe" : "Earrings" },
    { href: `/${locale}/necklaces`, label: de ? "Ketten" : "Necklaces" },
    { href: `/${locale}/rings`, label: de ? "Ringe" : "Rings" },
    { href: `/${locale}/pendants`, label: de ? "Anhänger" : "Pendants" },
    { href: `/${locale}/bracelets`, label: de ? "Armbänder" : "Bracelets" },
  ];

  const misc = [
    { href: `/${locale}/about`, label: de ? "Über uns" : "About" },
    { href: `/${locale}/contact`, label: de ? "Kontakt" : "Contact" },
    { href: `/${locale}/policies`, label: de ? "Richtlinien" : "Policies" },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] transition ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        } bg-black/45`}
        onClick={onClose}
        aria-hidden
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 right-0 z-[70] h-full w-[88%] max-w-sm bg-white border-l shadow-2xl transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
      >
        <div className="p-4 border-b flex items-center justify-between">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase text-neutral-900">
            Manaq Silver
          </div>
          <button
            onClick={onClose}
            className="rounded-full border px-3 py-2 text-sm hover:bg-neutral-50"
            aria-label="Close"
            title="Close"
          >
            ✕
          </button>
        </div>

        <div className="p-4 grid gap-6">
          {/* Primary links */}
          <div className="grid gap-2">
            <div className="text-xs tracking-[0.35em] uppercase text-neutral-500">
              {de ? "Shop" : "Shop"}
            </div>

            <div className="grid gap-2">
              {items.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="rounded-2xl border bg-white px-4 py-3 text-sm text-neutral-900 hover:bg-neutral-50"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Account / Cart */}
          <div className="grid gap-2">
            <div className="text-xs tracking-[0.35em] uppercase text-neutral-500">
              {de ? "Konto" : "Account"}
            </div>
            <div className="grid gap-2">
              <Link
                href={`/${locale}/cart`}
                onClick={onClose}
                className="rounded-2xl bg-neutral-900 text-white px-4 py-3 text-sm hover:opacity-90"
              >
                {de ? "Warenkorb" : "Cart"}
              </Link>

              <Link
                href={`/${locale}/account`}
                onClick={onClose}
                className="rounded-2xl border px-4 py-3 text-sm hover:bg-neutral-50"
              >
                {de ? "Anmelden" : "Login"}
              </Link>
            </div>
          </div>

          {/* Other */}
          <div className="grid gap-2">
            <div className="text-xs tracking-[0.35em] uppercase text-neutral-500">
              {de ? "Info" : "Info"}
            </div>

            <div className="grid gap-2">
              {misc.map((it) => (
                <Link
                  key={it.href}
                  href={it.href}
                  onClick={onClose}
                  className="rounded-2xl border px-4 py-3 text-sm hover:bg-neutral-50"
                >
                  {it.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Language */}
          <div className="grid gap-2">
            <div className="text-xs tracking-[0.35em] uppercase text-neutral-500">
              {de ? "Sprache" : "Language"}
            </div>

            <div className="flex gap-2">
              <Link
                href={`/de`}
                onClick={onClose}
                className={`rounded-full border px-4 py-2 text-sm ${
                  locale === "de" ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                }`}
              >
                DE
              </Link>
              <Link
                href={`/en`}
                onClick={onClose}
                className={`rounded-full border px-4 py-2 text-sm ${
                  locale === "en" ? "bg-neutral-900 text-white" : "hover:bg-neutral-50"
                }`}
              >
                EN
              </Link>
            </div>
          </div>

          <div className="pt-2 text-xs text-neutral-500">
            © {new Date().getFullYear()} Manaq Silver
          </div>
        </div>
      </aside>
    </>
  );
}