import Link from "next/link";
import Image from "next/image";

type DbProduct = {
  id: string;
  category: string;
  tier: string | null;
  price: number;
  name_en: string;
  name_de: string;
  images: string[] | null;
  status: string | null;
};

function coverImage(p: DbProduct) {
  const first = p.images?.[0]?.trim();
  return first && first.length > 0 ? first : "/placeholder.jpg";
}

export function ProductCardDb({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: DbProduct;
}) {
  const name = locale === "de" ? product.name_de : product.name_en;
  const cover = coverImage(product);

  return (
    <Link
      href={`/${locale}/product/${product.id}`}
      className="group block rounded-[24px] border bg-white p-4 transition hover:-translate-y-0.5 hover:shadow-lg"
    >
      {/* Image */}
      <div className="relative h-44 sm:h-52 rounded-2xl overflow-hidden bg-neutral-100 border">
        <Image
          src={cover}
          alt={name}
          fill
          sizes="(max-width: 640px) 100vw, 360px"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />

        {product.status === "reserved" && (
          <div className="absolute top-3 left-3 rounded-full bg-neutral-900 px-3 py-1 text-xs text-white">
            {locale === "de" ? "Reserved" : "Reserved"}
          </div>
        )}
      </div>

      {/* Text */}
      <div className="mt-3 grid gap-1">
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