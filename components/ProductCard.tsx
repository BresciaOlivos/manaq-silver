import Image from "next/image";
import Link from "next/link";

export type DbProduct = {
  id: string;
  category: string;
  price: number;
  name_en: string;
  name_de: string;
  description_en: string | null;
  description_de: string | null;
  images: string[] | null; // we store paths here
  status?: string | null;
};

function firstImage(p: DbProduct) {
  const arr = Array.isArray(p.images) ? p.images : [];
  const first = arr.find((x) => typeof x === "string" && x.trim().length > 0);
  return first ?? "/placeholder.jpg";
}

export default function ProductCard({
  locale,
  product,
}: {
  locale: "de" | "en";
  product: DbProduct;
}) {
  const name = locale === "de" ? product.name_de : product.name_en;
  const cover = firstImage(product);

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
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
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