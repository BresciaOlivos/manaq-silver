
import HeroMobile from "@/components/HeroMobile";
import  HighlightsRow  from "@/components/HighlightsRow";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  // Hardcoded highlights for now (later from Supabase)
  const highlights = [
    {
      id: "cereza",
      title: { de: "Set Cereza", en: "Cereza set" },
      subtitle: {
        de: "Ohrringe + Anhänger • Peru",
        en: "Earrings + pendant • Peru",
      },
      price: 50,
      href: `/${locale}/sets`,
      imageSrc: "/images/sets/cereza/cereza1.png",
    },
    {
      id: "peru-pendant",
      title: { de: "Tumi Anhänger", en: "Tumi pendant" },
      subtitle: {
        de: "Symbolisch • 950 Silber",
        en: "Iconic • 950 silver",
      },
      price: 50,
      href: `/${locale}/pendants`,
      imageSrc: "/images/sets/cereza/cereza2.png", // placeholder
    },
  ];

  return (
    <div className="grid gap-10">
      <HeroMobile locale={locale} />

      <HighlightsRow locale={locale} items={highlights} />

      {/* Categories */}
      <section className="grid gap-4">
        <h2 className="text-lg font-semibold">{de ? "Shop" : "Shop"}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Cat locale={locale} href="earrings" title={de ? "Ohrringe" : "Earrings"} />
          <Cat locale={locale} href="necklaces" title={de ? "Ketten" : "Necklaces"} />
          <Cat locale={locale} href="rings" title={de ? "Ringe" : "Rings"} />
          <Cat locale={locale} href="sets" title="Sets" />
          <Cat locale={locale} href="pendants" title={de ? "Anhänger" : "Pendants"} />
          <Cat locale={locale} href="about" title={de ? "Über uns" : "About"} />
        </div>
      </section>

      {/* Footer / contact strip */}
      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <div className="text-sm font-semibold text-neutral-900">
          {de ? "Kontakt" : "Contact"}
        </div>

        <div className="text-sm text-neutral-700 grid gap-1">
          <div>Email: hello@manaqsilver.de</div>
          <div>Instagram: @manaqsilver</div>
          <div>TikTok: @manaqsilver</div>
        </div>

        <div className="pt-2 text-xs text-neutral-500">
          {de ? "Newsletter kommt als nächstes (optional)." : "Newsletter is next (optional)."}
        </div>
      </section>
    </div>
  );
}

function Cat({
  locale,
  href,
  title,
}: {
  locale: string;
  href: string;
  title: string;
}) {
  return (
    <Link
      href={`/${locale}/${href}`}
      className="rounded-[22px] border bg-white p-6 hover:bg-neutral-50 transition"
    >
      <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
        Manaq
      </div>
      <div className="mt-2 text-xl font-semibold text-neutral-900">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">
        {locale === "de" ? "Entdecken →" : "Explore →"}
      </div>
    </Link>
  );
}