import Image from "next/image";
import Link from "next/link";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  const t = {
    title: de ? "Über Manaq" : "About Manaq",
    subtitle: de
      ? "950 Peruanisches Silber — kuratiert in Europa."
      : "950 Peruvian silver — curated in Europe.",
    p1: de
      ? "Manaq Silver verbindet peruanisches Handwerk mit einem modernen, minimalistischen Stil. Jedes Stück ist aus 950er Silber gefertigt — einer hochwertigen Legierung, die in Peru traditionell verwendet wird."
      : "Manaq Silver connects Peruvian craftsmanship with a modern, minimalist aesthetic. Each piece is made in 950 silver — a premium alloy traditionally used in Peru.",
    p2: de
      ? "Unsere Kollektion ist limitiert: wenige Stücke, sorgfältig ausgewählt, schnell vergriffen. Du kannst Artikel für 15 Minuten reservieren und sicher online bezahlen — Versand erfolgt aus Deutschland."
      : "Our collection is limited: small drops, carefully curated, and often sold out quickly. You can reserve items for 15 minutes, pay securely online, and we ship from Germany.",
    valuesTitle: de ? "Wofür wir stehen" : "What we stand for",
    values: [
      {
        title: de ? "Echtes Material" : "Real material",
        body: de
          ? "950 Silber, handgefertigt — keine Massenware."
          : "950 silver, handcrafted — not mass-produced.",
      },
      {
        title: de ? "Limitierte Drops" : "Limited drops",
        body: de
          ? "Kleine Stückzahlen — curated, nicht überladen."
          : "Small quantities — curated, not overwhelming.",
      },
      {
        title: de ? "Versand aus Deutschland" : "Ships from Germany",
        body: de
          ? "Schneller & transparenter Versand innerhalb DE/EU."
          : "Fast & transparent shipping within DE/EU.",
      },
    ],
    ctaTitle: de ? "Bereit zum Entdecken?" : "Ready to explore?",
    ctaBody: de
      ? "Starte mit unseren Sets oder entdecke Anhänger mit peruanischen Symbolen."
      : "Start with our sets or explore pendants with Peruvian symbols.",
    cta1: de ? "Zu den Sets" : "Shop sets",
    cta2: de ? "Anhänger" : "Pendants",
  };

  return (
    <div className="grid gap-10">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-[28px] border bg-black text-white">
        <div className="absolute inset-0">
          {/* If you don’t have this image yet, it still won’t crash if it exists.
              Put later: public/images/about/about-hero.jpg */}
          <Image
            src="/images/hero/hero.png"
            alt="Manaq Silver"
            fill
            className="object-cover object-center opacity-85"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/60 to-black/85" />
        </div>

        <div className="relative p-7 sm:p-10 md:p-12 max-w-3xl grid gap-4">
          <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
            {t.subtitle}
          </p>
          <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
            {t.title}
          </h1>
        </div>
      </section>

      {/* Story */}
      <section className="grid gap-4 max-w-3xl">
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {t.p1}
        </p>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed">
          {t.p2}
        </p>
      </section>

      {/* Values */}
      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-neutral-900">{t.valuesTitle}</h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {t.values.map((v) => (
            <div
              key={v.title}
              className="rounded-3xl border bg-white p-5 grid gap-2"
            >
              <div className="text-sm font-semibold text-neutral-900">{v.title}</div>
              <div className="text-sm text-neutral-600 leading-relaxed">{v.body}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="rounded-[28px] border bg-neutral-50 p-7 sm:p-10 grid gap-4">
        <div className="grid gap-1">
          <div className="text-lg font-semibold text-neutral-900">{t.ctaTitle}</div>
          <div className="text-sm text-neutral-700">{t.ctaBody}</div>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/sets`}
            className="rounded-full bg-neutral-900 text-white px-6 py-3 text-sm font-medium hover:opacity-90"
          >
            {t.cta1}
          </Link>
          <Link
            href={`/${locale}/pendants`}
            className="rounded-full border px-6 py-3 text-sm hover:bg-white"
          >
            {t.cta2}
          </Link>
        </div>
      </section>
    </div>
  );
}