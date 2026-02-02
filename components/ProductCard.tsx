import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/products";

function firstImage(product: Product) {
  const img = product.images;
  const src =
    Array.isArray(img) ? (img[0] ?? "/placeholder.jpg") : img || "/placeholder.jpg";

  // ✅ make it safe even if you accidentally put "infinito.png"
  if (src.startsWith("http")) return src;
  if (src.startsWith("/")) return src;
  return `/${src}`;
}

export function ProductCard({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: Product;
}) {
  const cover = firstImage(product);

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition
                 hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-100 border">
        <Image
          src={cover}
          alt={product.name[locale]}
          fill
          sizes="(max-width: 768px) 100vw, 400px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {/* Reserved badge (optional) */}
        {"status" in (product as any) && (product as any).status === "reserved" && (
          <div className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            {locale === "de" ? "Reserviert" : "Reserved"}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="mt-4 grid gap-1">
        <div className="text-sm tracking-wide text-neutral-500 uppercase">
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