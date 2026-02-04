import InventoryClient from "@/components/InventoryClient";

const supported = ["de", "en"] as const;

export default async function InventoryPage({
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
        <h1 className="text-2xl font-semibold">Inventory</h1>
        <p className="text-sm text-neutral-600">
          Add / edit products in Supabase. (Admin page)
        </p>
      </div>

      <InventoryClient locale={locale} />
    </div>
  );
}