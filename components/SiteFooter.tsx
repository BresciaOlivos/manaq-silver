"use client";

import { useState } from "react";
import Link from "next/link";

export function SiteFooter({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("idle");

    // For now: just fake success.
    // Later we can connect this to Mailchimp / Brevo / Supabase table etc.
    if (!email.trim() || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setEmail("");
    setStatus("ok");
  }

  return (
    <footer className="mt-16 border-t bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 grid gap-10 md:grid-cols-3">
        {/* Brand */}
        <div className="grid gap-2">
          <div className="text-sm font-semibold tracking-[0.35em] uppercase">
            Manaq Silver
          </div>
          <p className="text-sm text-neutral-600 max-w-sm">
            {de
              ? "950 Peruanisches Silber • Versand aus Deutschland"
              : "950 Peruvian Silver • Ships from Germany"}
          </p>
        </div>

        {/* Links */}
        <div className="grid gap-2 text-sm">
          <div className="font-medium text-neutral-900">
            {de ? "Links" : "Links"}
          </div>
          <Link className="text-neutral-600 hover:text-neutral-900" href={`/${locale}/about`}>
            {de ? "Über uns" : "About"}
          </Link>
          <Link className="text-neutral-600 hover:text-neutral-900" href={`/${locale}/contact`}>
            {de ? "Kontakt" : "Contact"}
          </Link>
          <Link className="text-neutral-600 hover:text-neutral-900" href={`/${locale}/cart`}>
            {de ? "Warenkorb" : "Cart"}
          </Link>
        </div>

        {/* Newsletter */}
        <div className="grid gap-3">
          <div className="font-medium text-neutral-900">
            {de ? "Newsletter" : "Newsletter"}
          </div>

          <p className="text-sm text-neutral-600">
            {de
              ? "Monatliche Updates & neue Drops."
              : "Monthly updates & new drops."}
          </p>

          <form onSubmit={onSubmit} className="flex gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={de ? "E-Mail" : "Email"}
              className="w-full rounded-xl border px-3 py-2 text-sm"
            />
            <button
              type="submit"
              className="rounded-xl bg-neutral-900 px-4 py-2 text-sm text-white hover:opacity-90"
            >
              {de ? "OK" : "OK"}
            </button>
          </form>

          {status === "ok" && (
            <div className="text-xs text-green-700">
              {de ? "Danke! Du bist dabei." : "Thanks! You’re in."}
            </div>
          )}

          {status === "error" && (
            <div className="text-xs text-red-700">
              {de ? "Bitte gültige E-Mail eingeben." : "Please enter a valid email."}
            </div>
          )}
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-6 text-xs text-neutral-500">
          © {new Date().getFullYear()} Manaq Silver
        </div>
      </div>
    </footer>
  );
}