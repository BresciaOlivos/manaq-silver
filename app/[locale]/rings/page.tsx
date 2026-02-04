import CategoryGridPage from "@/components/CategoryGridPage";
const supported = ["de","en"] as const;

export default async function RingsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = supported.includes(rawLocale as any) ? (rawLocale as any) : "en";
  return <CategoryGridPage locale={locale} category="rings" />;
}