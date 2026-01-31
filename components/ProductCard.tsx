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
  const cover = product.images?.[0] ?? "/placeholder.jpg";

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      <div className="relative h-48 sm:h-56 rounded-2xl overflow-hidden bg-neutral-100 border">
        <Image
          src={cover}
          alt={product.name[locale]}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 640px) 100vw, 33vw"
        />
      </div>

      <div className="mt-4 grid gap-1">
        <div className="text-sm tracking-wide text-neutral-500 uppercase">Manaq</div>

        <div className="text-base font-medium text-neutral-900 group-hover:underline">
          {product.name[locale]}
        </div>

        <div className="text-sm text-neutral-700">€{product.price}</div>
      </div>
    </Link>
  );
}