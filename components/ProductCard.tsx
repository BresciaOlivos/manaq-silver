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
  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-3xl bg-white border hairline p-3 transition
                 hover:-translate-y-0.5 hover:shadow-md"
    >
      {/* IMAGE */}
      <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-100">
        <Image
          src={product.images?.[0] ?? "/images/placeholder.png"}
          alt={product.name[locale]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Reserved badge */}
        {product.status === "reserved" && (
          <div className="absolute top-3 left-3 rounded-full bg-black/80 px-3 py-1 text-[11px] text-white backdrop-blur">
            {locale === "de" ? "Reserviert" : "Reserved"}
          </div>
        )}
      </div>

      {/* TEXT */}
      <div className="mt-3 grid gap-1 px-1">
        <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
          Manaq
        </div>

        <div className="text-[15px] font-medium text-neutral-900">
          {product.name[locale]}
        </div>

        <div className="text-sm text-neutral-700">
          €{product.price}
        </div>
      </div>
    </Link>
  );
}
