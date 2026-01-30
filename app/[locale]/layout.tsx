import { AppProviders } from "@/components/AppProviders";
import MobileHeader from "@/components/MobileHeader";

const supported = ["de", "en"] as const;

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = supported.includes(rawLocale as any)
    ? (rawLocale as any)
    : "en";

  return (
    <AppProviders>
      <MobileHeader locale={locale} />
      <main className="mx-auto max-w-6xl px-4 pt-6 pb-10 lg:py-10">
  {children}
</main>
    </AppProviders>
  );
}