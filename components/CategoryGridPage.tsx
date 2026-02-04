"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import ProductCard, { DbProduct } from "@/components/ProductCard";

const TITLES: Record<string, string> = {
  earrings: "Earrings",
  rings: "Rings",
  bracelets: "Bracelets",
  necklaces: "Necklaces",
  pendants: "Pendants",
  sets: "Sets",
};

export default function CategoryGridPage({ category }: { category: string }) {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const [items, setItems] = useState<DbProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("products")
        .select("id,category,price,name_en,name_de,description_en,description_de,images,status")
        .eq("category", category)
        .order("price", { ascending: true });

      if (!alive) return;

      if (error) {
        console.error(error);
        setItems([]);
        setLoading(false);
        return;
      }

      // Ensure images is always an array
      const normalized = (data ?? []).map((p: any) => ({
        ...p,
        images: Array.isArray(p.images) ? p.images : [],
      })) as DbProduct[];

      setItems(normalized);
      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, [category]);

  const title = useMemo(() => TITLES[category] ?? category, [category]);

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">{title}</h1>

      {loading ? (
        <p className="text-neutral-600">Loading…</p>
      ) : items.length === 0 ? (
        <p className="text-neutral-600">No products yet.</p>
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