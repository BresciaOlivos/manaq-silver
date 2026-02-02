
import HeroMobile from "@/components/HeroMobile";
import Link from "next/link";
import Image from "next/image";

type Highlight = {
  id: string;
  title: { de: string; en: string };
  subtitle: { de: string; en: string };
  price: number;
  href: string;
  imageSrc: string;
};

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  const highlights: Highlight[] = [
    {
      id: "cereza",
      title: { de: "Set Cereza", en: "Cereza set" },
      subtitle: { de: "Ohrringe + Anhänger • Peru", en: "Earrings + pendant • Peru" },
      price: 50,
      href: `/${locale}/sets`,
      imageSrc: "/images/sets/cereza/cereza1.png",
    },
    {
      id: "cereza-2",
      title: { de: "Cereza Detail", en: "Cereza detail" },
      subtitle: { de: "950 Silber • Handarbeit", en: "950 silver • Handmade" },
      price: 50,
      href: `/${locale}/sets`,
      imageSrc: "/images/sets/cereza/cereza2.png",
    },
  ];

  return (
    <div className="grid gap-10">
      <HeroMobile locale={locale} />

      {/* Highlights row */}
      <section className="grid gap-3">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold">{de ? "Neu & Highlights" : "New & Highlights"}</h2>
            <p className="text-sm text-neutral-600">
              {de ? "Wische für mehr →" : "Swipe for more →"}
            </p>
          </div>
          <Link
            href={`/${locale}/sets`}
            className="text-sm text-neutral-700 hover:text-neutral-900"
          >
            {de ? "Alle ansehen →" : "View all →"}
          </Link>
        </div>

        <div className="flex gap-4 overflow-x-auto pb-2 -mx-1 px-1 snap-x snap-mandatory">
          {highlights.map((h) => (
            <Link
              key={h.id}
              href={h.href}
              className="snap-start shrink-0 w-[82%] sm:w-[46%] lg:w-[30%] rounded-[24px] border bg-white p-4 hover:shadow-lg transition"
            >
              <div className="relative h-48 rounded-2xl overflow-hidden bg-neutral-100">
                <Image
                  src={h.imageSrc}
                  alt={h.title[locale]}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 80vw, 33vw"
                />
              </div>

              <div className="mt-4 grid gap-1">
                <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                  Manaq
                </div>
                <div className="text-base font-medium text-neutral-900">{h.title[locale]}</div>
                <div className="text-sm text-neutral-600">{h.subtitle[locale]}</div>
                <div className="pt-1 text-sm text-neutral-900 font-medium">€{h.price}</div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="grid gap-4">
        <h2 className="text-lg font-semibold">{de ? "Shop" : "Shop"}</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Cat locale={locale} href="earrings" title={de ? "Ohrringe" : "Earrings"} />
          <Cat locale={locale} href="necklaces" title={de ? "Ketten" : "Necklaces"} />
          <Cat locale={locale} href="rings" title={de ? "Ringe" : "Rings"} />
          <Cat locale={locale} href="sets" title="Sets" />
          <Cat locale={locale} href="pendants" title={de ? "Anhänger" : "Pendants"} />
                    <Cat locale={locale} href="bracelets" title={de ? "Armbänder" : "bracelets"} />

          <Cat locale={locale} href="about" title={de ? "Über uns" : "About"} />
        </div>
      </section>

      {/* Contact strip */}
      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <div className="text-sm font-semibold text-neutral-900">
          {de ? "Kontakt" : "Contact"}
        </div>

        <div className="text-sm text-neutral-700 grid gap-1">
          <div>Email: hello@manaqsilver.de</div>
          <div>Instagram: @manaqsilver</div>
          <div>TikTok: @manaqsilver</div>
        </div>
      </section>
    </div>
  );
}

function Cat({ locale, href, title }: { locale: string; href: string; title: string }) {
  return (
    <Link
      href={`/${locale}/${href}`}
      className="rounded-[22px] border bg-white p-6 hover:bg-neutral-50 transition"
    >
      <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">Manaq</div>
      <div className="mt-2 text-xl font-semibold text-neutral-900">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">{locale === "de" ? "Entdecken →" : "Explore →"}</div>
    </Link>
  );
}