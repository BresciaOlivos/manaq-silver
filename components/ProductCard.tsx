
import Link from "next/link";
import Image from "next/image";
import type { Product } from "@/data/products";

export function ProductCard({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: Product;
}) {
  // Product has `image` (singular). If missing, show placeholder.
  const imgSrc = (product as any).image ?? "/images/placeholder.png";

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-100 border">
        <Image
          src={imgSrc}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 640px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Reserved badge (safe check) */}
        {("status" in product && (product as any).status === "reserved") && (
          <div className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            {locale === "de" ? "Reserviert" : "Reserved"}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="mt-4 grid gap-1">
        <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
          Manaq
        </div>

        <div className="text-base font-medium text-neutral-900 group-hover:underline">
          {product.name[locale]}
        </div>

        <div className="text-sm text-neutral-700">€{product.price}</div>
      </div>
    </Link>
  );
}