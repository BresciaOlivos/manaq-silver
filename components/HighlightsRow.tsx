"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

type Item = {
  id: string;
  title: { de: string; en: string };
  subtitle: { de: string; en: string };
  price: number;
  href: string;      // should be "/product/<id>"
  imageSrc: string;
};

const FILTERS = [
  { key: "all", label: { de: "Alle", en: "All" } },
  { key: "sets", label: { de: "Sets", en: "Sets" } },
  { key: "earrings", label: { de: "Ohrringe", en: "Earrings" } },
  { key: "rings", label: { de: "Ringe", en: "Rings" } },
  { key: "bracelets", label: { de: "Armbänder", en: "Bracelets" } },
  { key: "pendants", label: { de: "Anhänger", en: "Pendants" } },
  { key: "necklaces", label: { de: "Ketten", en: "Necklaces" } },
];

function moneyEUR(n: number) {
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 0,
  }).format(n);
}

export default function HighlightsRow({
  locale,
  items,
}: {
  locale: "de" | "en";
  items: Item[];
}) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return items;
    // we infer category from subtitle prefix (since we kept it `${category} • ...`)
    return items.filter((x) => (x.subtitle.en || "").toLowerCase().startsWith(filter));
  }, [items, filter]);

  return (
    <div className="grid gap-3">
      {/* Filter chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {FILTERS.map((f) => {
          const active = f.key === filter;
          return (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`shrink-0 rounded-full px-4 py-2 text-sm border transition ${
                active
                  ? "bg-neutral-900 text-white border-neutral-900"
                  : "bg-white text-neutral-800 hover:bg-neutral-50"
              }`}
            >
              {f.label[locale]}
            </button>
          );
        })}
      </div>

      {/* Luxury horizontal scroll */}
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pr-2">
        {filtered.map((x) => (
          <Link
            key={x.id}
            href={`/${locale}${x.href}`}
            className="snap-start shrink-0 w-[82%] sm:w-[360px] rounded-[26px] border bg-white overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative aspect-[4/3] bg-neutral-100">
              <Image
                src={x.imageSrc}
                alt={x.title[locale]}
                fill
                sizes="(max-width: 640px) 82vw, 360px"
                className="object-cover"
              />
              {/* soft luxury fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
            </div>

            <div className="p-4 grid gap-1">
              <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
                Manaq • 950
              </div>

              <div className="flex items-start justify-between gap-3">
                <div className="grid gap-0.5">
                  <div className="text-base font-semibold text-neutral-900">
                    {x.title[locale]}
                  </div>
                  <div className="text-sm text-neutral-600">
                    {x.subtitle[locale]}
                  </div>
                </div>

                <div className="text-sm font-semibold text-neutral-900">
                  {moneyEUR(x.price)}
                </div>
              </div>

              <div className="pt-2 text-sm text-neutral-800 underline">
                {locale === "de" ? "Ansehen →" : "View →"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}