import Link from "next/link";
import type { Product } from "@/data/products";

export function ProductCard({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: Product;
}) {
  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition
                 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative mb-4 aspect-[4/3] rounded-[18px] bg-neutral-100 overflow-hidden">
        {/* Placeholder – later replace with <Image /> */}
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 to-neutral-100" />

        {/* Reserved badge (future-ready) */}
        {("status" in product && (product as any).status === "reserved") && (
  <div className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
    {locale === "de" ? "Reserviert" : "Reserved"}
  </div>
)}
      </div>

      {/* Text */}
      <div className="grid gap-1">
        <div className="text-sm tracking-wide text-neutral-500 uppercase">
          Manaq
        </div>

        <div className="text-base font-medium text-neutral-900 group-hover:underline">
          {product.name[locale]}
        </div>

        <div className="text-sm text-neutral-700">
          €{product.price}
        </div>
      </div>
    </Link>
  );
}
