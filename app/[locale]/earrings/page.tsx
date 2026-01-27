"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import { ProductCard } from "@/components/ProductCard";

type DbProduct = {
  id: string;
  name_en: string;
  name_de: string;
  price: number;
  category: string;
  description_en: string | null;
  description_de: string | null;
};

export default function EarringsPage() {
  const params = useParams();
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const [items, setItems] = useState<DbProduct[]>([]);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "earrings");

      if (error) {
        console.error(error);
        return;
      }
      setItems(data ?? []);
    })();
  }, []);

  const mapped = items.map((p) => ({
    id: p.id,
    name: { en: p.name_en, de: p.name_de },
    price: p.price,
    category: "earrings" as const,
    description: { en: p.description_en ?? "", de: p.description_de ?? "" },
    image: "/placeholder.jpg",
  }));

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">
        {locale === "de" ? "Ohrringe" : "Earrings"}
      </h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        {mapped.map((p) => (
          <ProductCard key={p.id} locale={locale} product={p as any} />
        ))}
      </div>
    </div>
  );
}
