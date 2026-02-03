"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { supabase } from "@/lib/supabaseClient";

type DbProduct = {
  id: string;
  category: string;
  price: number;
  status: string | null;
  name_en: string;
  name_de: string;
  description_en: string | null;
  description_de: string | null;
  images: string[] | null;
};

const CATEGORIES = [
  { key: "all", label: { en: "All", de: "Alle" } },
  { key: "earrings", label: { en: "Earrings", de: "Ohrringe" } },
  { key: "rings", label: { en: "Rings", de: "Ringe" } },
  { key: "sets", label: { en: "Sets", de: "Sets" } },
  { key: "pendants", label: { en: "Pendants", de: "Anhänger" } },
  { key: "necklaces", label: { en: "Necklaces", de: "Ketten" } },
  { key: "bracelets", label: { en: "Bracelets", de: "Armbänder" } },
];

function moneyEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

function coverImage(p: DbProduct) {
  const img0 = p.images?.[0]?.trim();
  return img0 && img0.length ? img0 : "/placeholder.jpg";
}

export default function ShopAllClient({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  const [items, setItems] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  // filters
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [availability, setAvailability] = useState("all"); // all | available | reserved | sold
  const [sort, setSort] = useState("newest"); // newest | price_asc | price_desc

  async function load() {
    setLoading(true);

    let query = supabase
      .from("products")
      .select(
        "id,category,price,status,name_en,name_de,description_en,description_de,images"
      );

    // category filter
    if (cat !== "all") query = query.eq("category", cat);

    // status filter
    if (availability !== "all") query = query.eq("status", availability);

    // simple search (name)
    if (q.trim()) {
      // Supabase "ilike" works on one column at a time; we’ll search both by OR.
      query = query.or(
        `name_en.ilike.%${q.trim()}%,name_de.ilike.%${q.trim()}%`
      );
    }

    // sort
    if (sort === "price_asc") query = query.order("price", { ascending: true });
    if (sort === "price_desc") query = query.order("price", { ascending: false });
    if (sort === "newest") query = query.order("id", { ascending: false }); // simple fallback

    const { data, error } = await query;

    if (error) {
      console.error(error);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as DbProduct[]);
    setLoading(false);
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q, cat, availability, sort]);

  const countLabel = useMemo(() => {
    if (loading) return de ? "Laden…" : "Loading…";
    return de ? `${items.length} Artikel` : `${items.length} items`;
  }, [items.length, loading, de]);

  return (
    <div className="grid gap-5">
      {/* FILTER BAR */}
      <div className="grid gap-3 rounded-3xl border bg-white p-4">
        <div className="flex items-center justify-between gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder={de ? "Suchen…" : "Search…"}
            className="w-full rounded-2xl border px-4 py-2 text-sm"
          />
          <div className="text-xs text-neutral-500 shrink-0">{countLabel}</div>
        </div>

        <div className="flex flex-wrap gap-2">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
          >
            {CATEGORIES.map((c) => (
              <option key={c.key} value={c.key}>
                {c.label[locale]}
              </option>
            ))}
          </select>

          <select
            value={availability}
            onChange={(e) => setAvailability(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
          >
            <option value="all">{de ? "Alle Status" : "All status"}</option>
            <option value="available">{de ? "Verfügbar" : "Available"}</option>
            <option value="reserved">{de ? "Reserviert" : "Reserved"}</option>
            <option value="sold">{de ? "Verkauft" : "Sold"}</option>
          </select>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-2xl border px-3 py-2 text-sm"
          >
            <option value="newest">{de ? "Neu" : "Newest"}</option>
            <option value="price_asc">{de ? "Preis ↑" : "Price ↑"}</option>
            <option value="price_desc">{de ? "Preis ↓" : "Price ↓"}</option>
          </select>
        </div>
      </div>

      {/* GRID */}
      {loading ? (
        <div className="text-sm text-neutral-600">{de ? "Laden…" : "Loading…"}</div>
      ) : items.length === 0 ? (
        <div className="text-sm text-neutral-600">{de ? "Keine Produkte." : "No products yet."}</div>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
          {items.map((p) => {
            const name = locale === "de" ? p.name_de : p.name_en;
            const img = coverImage(p);

            return (
              <Link
                key={p.id}
                href={`/${locale}/product/${p.id}`}
                className="group rounded-3xl border bg-white p-3 hover:shadow-md transition"
              >
                <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-neutral-100">
                  <Image
                    src={img}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                  {p.status === "sold" && (
                    <div className="absolute top-2 left-2 rounded-full bg-black/70 text-white text-xs px-3 py-1">
                      {de ? "Verkauft" : "Sold"}
                    </div>
                  )}
                  {p.status === "reserved" && (
                    <div className="absolute top-2 left-2 rounded-full bg-black/70 text-white text-xs px-3 py-1">
                      {de ? "Reserviert" : "Reserved"}
                    </div>
                  )}
                </div>

                <div className="mt-3 grid gap-1">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-neutral-500">
                    Manaq
                  </div>
                  <div className="text-sm font-medium text-neutral-900 leading-snug">
                    {name}
                  </div>
                  <div className="text-sm text-neutral-700">{moneyEUR(p.price)}</div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}