"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import type { Product } from "@/data/products";
import { useCart } from "@/components/CartProvider";

function moneyEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function getImages(p: any): string[] {
  // Supports: image: "..." OR image: ["...","..."]
  const img = p?.image;
  if (Array.isArray(img)) return img.map((x) => String(x).trim()).filter(Boolean);
  if (typeof img === "string" && img.trim()) return [img.trim()];
  return ["/placeholder.jpg"];
}

export default function ProductPage() {
  const params = useParams();
  const locale: "de" | "en" = params?.locale === "de" ? "de" : "en";
  const id = params.id as string;

  const cart = useCart();

  const product = useMemo<Product | undefined>(
    () => products.find((p) => p.id === id),
    [id]
  );

  const images = useMemo(() => getImages(product), [product]);

  // carousel state
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  function onScroll() {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActive(Math.max(0, Math.min(images.length - 1, idx)));
  }

  function goTo(i: number) {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  }

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-10 grid gap-3">
        <h1 className="text-xl font-semibold">
          {locale === "de" ? "Produkt nicht gefunden" : "Product not found"}
        </h1>
        <div className="text-sm text-neutral-600">id: {id}</div>
        <Link
          href={`/${locale}`}
          className="text-sm underline text-neutral-900"
        >
          {locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>
      </div>
    );
  }

  const name = product.name[locale];
  const desc = product.description[locale];

  const alreadyInCart = cart.items.some((x) => x.productId === id);

  return (
    <div className="max-w-3xl mx-auto grid gap-6 lg:gap-10">
      {/* ====== MEDIA (Luxury carousel) ====== */}
      <section className="grid gap-3">
        <div className="relative rounded-3xl border bg-white overflow-hidden">
          {/* swipe container */}
          <div
            ref={scrollerRef}
            onScroll={onScroll}
            className="flex overflow-x-auto snap-x snap-mandatory scroll-smooth"
            style={{ WebkitOverflowScrolling: "touch" as any }}
          >
            {images.map((src, i) => (
              <div
                key={src + i}
                className="relative w-full shrink-0 snap-center aspect-[4/5] sm:aspect-[16/10] bg-neutral-100"
              >
                <Image
                  src={src}
                  alt={`${name} ${i + 1}`}
                  fill
                  priority={i === 0}
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                />
                {/* soft overlay to feel luxury */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {/* counter top-right */}
          {images.length > 1 && (
            <div className="absolute top-3 right-3 rounded-full bg-black/55 text-white text-xs px-3 py-1 backdrop-blur">
              {active + 1}/{images.length}
            </div>
          )}

          {/* dots */}
          {images.length > 1 && (
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to image ${i + 1}`}
                  className={`h-2.5 w-2.5 rounded-full transition ${
                    i === active ? "bg-white" : "bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        {/* thumbnails (desktop only, optional luxury feel) */}
        {images.length > 1 && (
          <div className="hidden sm:flex gap-3">
            {images.map((src, i) => (
              <button
                key={src + i}
                onClick={() => goTo(i)}
                className={`relative h-20 w-16 rounded-2xl overflow-hidden border bg-neutral-100 ${
                  i === active ? "ring-2 ring-neutral-900" : ""
                }`}
                aria-label={`Thumbnail ${i + 1}`}
              >
                <Image
                  src={src}
                  alt={`${name} thumb ${i + 1}`}
                  fill
                  sizes="80px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </section>

      {/* ====== INFO ====== */}
      <section className="grid gap-4">
        <div className="grid gap-1">
          <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
            Manaq Silver • 950
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-neutral-900">
            {name}
          </h1>
          <div className="text-lg text-neutral-900">{moneyEUR(product.price)}</div>
        </div>

        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {desc}
        </p>

        {/* ====== CTA ====== */}
        {/* ====== CTA ====== */}
<div className="grid gap-2">
  {/* Desktop button (normal) */}
  <div className="hidden sm:block">
    <button
      onClick={() => {
        if (alreadyInCart) {
          window.location.href = `/${locale}/cart`;
          return;
        }
        cart.add(id);
        window.location.href = `/${locale}/cart`;
      }}
      className="w-full rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:opacity-90"
    >
      {alreadyInCart
        ? locale === "de"
          ? "Zum Warenkorb"
          : "Go to cart"
        : locale === "de"
        ? "In den Warenkorb"
        : "Add to cart"}
    </button>

    <div className="mt-2 text-xs text-neutral-500">
      {locale === "de"
        ? "Versand aus Deutschland • DE 4€ (frei ab 55€) • EU 7€ (frei ab 85€)"
        : "Ships from Germany • DE €4 (free over €55) • EU €7 (free over €85)"}
    </div>
  </div>

  {/* Mobile sticky CTA */}
  <div className="sm:hidden fixed bottom-0 left-0 right-0 z-30 border-t bg-white/90 backdrop-blur px-4 py-3">
    <button
      onClick={() => {
        if (alreadyInCart) {
          window.location.href = `/${locale}/cart`;
          return;
        }
        cart.add(id);
        window.location.href = `/${locale}/cart`;
      }}
      className="w-full rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:opacity-90"
    >
      {alreadyInCart
        ? locale === "de"
          ? "Zum Warenkorb"
          : "Go to cart"
        : locale === "de"
        ? "In den Warenkorb"
        : "Add to cart"}
    </button>

    <div className="mt-2 text-[11px] text-neutral-600">
      {locale === "de"
        ? "Versand aus Deutschland • DE 4€ (frei ab 55€) • EU 7€ (frei ab 85€)"
        : "Ships from Germany • DE €4 (free over €55) • EU €7 (free over €85)"}
    </div>
  </div>

  {/* Spacer so content isn't hidden behind sticky bar */}
  <div className="sm:hidden h-24" />
</div>

        <div className="pt-2">
          <Link
            href={`/${locale}/${product.category}`}
            className="text-sm text-neutral-700 underline"
          >
            {locale === "de" ? "Zurück" : "Back"}
          </Link>
        </div>
      </section>
    </div>
  );
}
