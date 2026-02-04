"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { useCart } from "@/components/CartProvider";

type DbProduct = {
  id: string;
  category: string;
  price: number;
  name_en: string;
  name_de: string;
  description_en: string | null;
  description_de: string | null;
  images: string[] | null;
};

function moneyEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function normalizeImages(p: DbProduct | null): string[] {
  const arr = p?.images;
  const list = Array.isArray(arr) ? arr.filter((x) => typeof x === "string" && x.trim()) : [];
  return list.length ? list : ["/placeholder.jpg"];
}

export default function ProductPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";
  const id = String(params.id || "");

  const cart = useCart();

  const [product, setProduct] = useState<DbProduct | null>(null);
  const [loading, setLoading] = useState(true);

  // carousel
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id,category,price,name_en,name_de,description_en,description_de,images")
        .eq("id", id)
        .single();

      if (!alive) return;

      if (error) {
        console.error(error);
        setProduct(null);
        setLoading(false);
        return;
      }

      const fixed = {
        ...(data as any),
        images: Array.isArray((data as any).images) ? (data as any).images : [],
      } as DbProduct;

      setProduct(fixed);
      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, [id]);

  const images = useMemo(() => normalizeImages(product), [product]);

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

  if (loading) return <div className="p-6">Loading…</div>;

  if (!product) {
    return (
      <div className="max-w-2xl mx-auto py-10 grid gap-3">
        <h1 className="text-xl font-semibold">
          {locale === "de" ? "Produkt nicht gefunden" : "Product not found"}
        </h1>
        <div className="text-sm text-neutral-600">id: {id}</div>
        <Link href={`/${locale}`} className="text-sm underline text-neutral-900">
          {locale === "de" ? "Zur Startseite" : "Back to home"}
        </Link>
      </div>
    );
  }

  const name = locale === "de" ? product.name_de : product.name_en;
  const desc = locale === "de" ? product.description_de ?? "" : product.description_en ?? "";

  const alreadyInCart = cart.items.some((x) => x.productId === id);

  return (
    <div className="max-w-3xl mx-auto grid gap-6 lg:gap-10 p-4">
      {/* Carousel */}
      <section className="grid gap-3">
        <div className="relative rounded-3xl border bg-white overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent pointer-events-none" />
              </div>
            ))}
          </div>

          {images.length > 1 && (
            <>
              <div className="absolute top-3 right-3 rounded-full bg-black/55 text-white text-xs px-3 py-1 backdrop-blur">
                {active + 1}/{images.length}
              </div>

              <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === active ? "bg-white" : "bg-white/40"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Info */}
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

        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">{desc}</p>

        <button
          onClick={() => {
            if (!alreadyInCart) cart.add(id);
            window.location.href = `/${locale}/cart`;
          }}
          className="rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:opacity-90"
        >
          {alreadyInCart ? "Go to cart" : "Add to cart"}
        </button>

        <Link href={`/${locale}/${product.category}`} className="text-sm text-neutral-700 underline">
          Back
        </Link>
      </section>
    </div>
  );
}