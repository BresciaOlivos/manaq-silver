// components/ProductCard.tsx
import Link from "next/link";
import Image from "next/image";
import type { DbProduct } from "@/lib/productsDb";

export function ProductCard({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: DbProduct;
}) {
  const name = locale === "de" ? product.name_de : product.name_en;

  // For now: placeholder image (tomorrow we connect your real photos)
  const cover = "/placeholder.jpg";

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-100 border">
        <Image
          src={cover}
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover"
        />

        {product.status === "reserved" && (
          <div className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            {locale === "de" ? "Reserviert" : "Reserved"}
          </div>
        )}
      </div>

      <div className="mt-4 grid gap-1">
        <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
          Manaq
        </div>

        <div className="text-base font-medium text-neutral-900 group-hover:underline">
          {name}
        </div>

        <div className="text-sm text-neutral-700">€{product.price}</div>
      </div>
    </Link>
  );
}