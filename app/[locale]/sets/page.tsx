"use client";

import { useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

type Tier = "all" | "premium" | "casual";
type Sort = "new" | "price-asc" | "price-desc";

export default function SetsPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const [tier, setTier] = useState<Tier>("all");
  const [sort, setSort] = useState<Sort>("new");

  const items = useMemo(() => {
    let list = products.filter((p) => p.category === "sets");

    if (tier !== "all") {
      list = list.filter((p) => (p.tier ?? "casual") === tier);
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);

    // "new" = keep the order in products.ts (so you control it manually)
    return list;
  }, [tier, sort]);

  const de = locale === "de";

  return (
    <div className="grid gap-6">
      <div className="grid gap-3">
        <h1 className="text-2xl font-semibold">Sets</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 items-center">
          <button
            onClick={() => setTier("all")}
            className={`rounded-full border px-3 py-1 text-sm ${
              tier === "all" ? "bg-neutral-900 text-white border-neutral-900" : "bg-white"
            }`}
          >
            {de ? "Alle" : "All"}
          </button>
          <button
            onClick={() => setTier("premium")}
            className={`rounded-full border px-3 py-1 text-sm ${
              tier === "premium" ? "bg-neutral-900 text-white border-neutral-900" : "bg-white"
            }`}
          >
            {de ? "Premium" : "Premium"}
          </button>
          <button
            onClick={() => setTier("casual")}
            className={`rounded-full border px-3 py-1 text-sm ${
              tier === "casual" ? "bg-neutral-900 text-white border-neutral-900" : "bg-white"
            }`}
          >
            {de ? "Casual" : "Casual"}
          </button>

          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-neutral-500">{de ? "Sortieren:" : "Sort:"}</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
              className="rounded-full border px-3 py-1 text-sm bg-white"
            >
              <option value="new">{de ? "Neu" : "New"}</option>
              <option value="price-asc">{de ? "Preis ↑" : "Price ↑"}</option>
              <option value="price-desc">{de ? "Preis ↓" : "Price ↓"}</option>
            </select>
          </div>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-neutral-600">{de ? "Noch keine Sets." : "No sets yet."}</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {items.map((p) => (
            <ProductCard key={p.id} locale={locale} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
