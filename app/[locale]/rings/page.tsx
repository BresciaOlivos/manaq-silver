import { products } from "@/data/products";
import { ProductCard } from "@/components/ProductCard";

export default function RingsPage({
  params,
}: {
  params: { locale: string };
}) {
  const locale: "de" | "en" = params.locale === "de" ? "de" : "en";

  const items = products.filter((p) => p.category === "rings");

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">
        {locale === "de" ? "Ringe" : "Rings"}
      </h1>

      {items.length === 0 ? (
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
