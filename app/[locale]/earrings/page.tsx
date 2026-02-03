import { ProductCard } from "@/components/ProductCard";
import { fetchProductsByCategory } from "@/lib/productsDb";

const supported = ["de", "en"] as const;

export default async function EarringsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = supported.includes(rawLocale as any)
    ? (rawLocale as any)
    : "en";

  const items = await fetchProductsByCategory("earrings");

  return (
    <div className="grid gap-6">
      <h1 className="text-2xl font-semibold">Earrings</h1>

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