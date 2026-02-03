
import ShopAllClient from "@/components/ShopAllClient";

const supported = ["de", "en"] as const;

export default async function ShopAllPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = supported.includes(rawLocale as any)
    ? (rawLocale as any)
    : "en";

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h1 className="text-2xl font-semibold">
          {locale === "de" ? "Shop" : "Shop"}
        </h1>
        <p className="text-sm text-neutral-600">
          {locale === "de"
            ? "Alle Produkte — filtere nach Kategorie, Preis und Verfügbarkeit."
            : "All products — filter by category, price, and availability."}
        </p>
      </div>

      <ShopAllClient locale={locale} />
    </div>
  );
}