"use client";

import Link from "next/link";
import { X } from "lucide-react";

export function MobileMenuDrawer({
  open,
  onClose,
  locale,
}: {
  open: boolean;
  onClose: () => void;
  locale: "de" | "en";
}) {
  const de = locale === "de";

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <button
        aria-label="Close menu"
        onClick={onClose}
        className="absolute inset-0 bg-black/50"
      />

      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl">
        <div className="p-5 border-b flex items-center justify-between">
          <div className="text-sm font-semibold tracking-[0.25em] uppercase">
            Manaq
          </div>
          <button
            onClick={onClose}
            className="rounded-full border p-2 hover:bg-neutral-50"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-5 grid gap-2 text-sm">
          <MenuLink locale={locale} href="/earrings" label={de ? "Ohrringe" : "Earrings"} onClose={onClose} />
          <MenuLink locale={locale} href="/necklaces" label={de ? "Ketten" : "Necklaces"} onClose={onClose} />
          <MenuLink locale={locale} href="/rings" label={de ? "Ringe" : "Rings"} onClose={onClose} />
          <MenuLink locale={locale} href="/sets" label="Sets" onClose={onClose} />
          <MenuLink locale={locale} href="/pendants" label={de ? "Anhänger" : "Pendants"} onClose={onClose} />
          <MenuLink locale={locale} href="/about" label={de ? "Über uns" : "About"} onClose={onClose} />
          <MenuLink locale={locale} href="/contact" label={de ? "Kontakt" : "Contact"} onClose={onClose} />
          <div className="my-3 border-t" />

          <MenuLink locale={locale} href="/cart" label={de ? "Warenkorb" : "Cart"} onClose={onClose} />
          <MenuLink locale={locale} href="/account" label={de ? "Konto" : "Account"} onClose={onClose} />

          <div className="my-3 border-t" />
          <div className="text-xs text-neutral-500">{de ? "Sprache" : "Language"}</div>
          <div className="flex gap-2">
            <LangButton active={locale === "de"} href="/de" label="DE" onClose={onClose} />
            <LangButton active={locale === "en"} href="/en" label="EN" onClose={onClose} />
          </div>

          <div className="my-3 border-t" />
          <div className="text-xs text-neutral-500">{de ? "Richtlinien" : "Policies"}</div>
          <MenuLink locale={locale} href="/policy/shipping" label={de ? "Versand" : "Shipping"} onClose={onClose} />
          <MenuLink locale={locale} href="/policy/returns" label={de ? "Rückgabe" : "Returns"} onClose={onClose} />
          <MenuLink locale={locale} href="/policy/privacy" label={de ? "Datenschutz" : "Privacy"} onClose={onClose} />

          <div className="mt-6 text-xs text-neutral-500">
            © {new Date().getFullYear()} Manaq Silver
          </div>
        </div>
      </div>
    </div>
  );
}

function MenuLink({
  locale,
  href,
  label,
  onClose,
}: {
  locale: "de" | "en";
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={`/${locale}${href}`}
      onClick={onClose}
      className="rounded-xl border px-4 py-3 hover:bg-neutral-50 transition"
    >
      {label}
    </Link>
  );
}

function LangButton({
  active,
  href,
  label,
  onClose,
}: {
  active: boolean;
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className={`rounded-full border px-4 py-2 text-xs font-semibold ${
        active ? "bg-neutral-900 text-white border-neutral-900" : "bg-white"
      }`}
    >
      {label}
    </Link>
  );
}