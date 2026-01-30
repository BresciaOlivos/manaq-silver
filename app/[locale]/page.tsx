import Image from "next/image";
import Link from "next/link";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  const hero = "/images/hero/hero.PNG"; // IMPORTANT: matches your file name exactly

  return (
    <div className="grid gap-10">
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[28px] border bg-black text-white">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={hero}
            alt="Manaq Silver"
            fill
            priority
            className="object-cover object-center"
            sizes="(max-width: 768px) 100vw, 1200px"
          />

          {/* Luxury overlays */}
          <div className="absolute inset-0 bg-black/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/85" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-transparent" />
        </div>

        {/* Content */}
        <div className="relative p-7 sm:p-10 md:p-14 grid gap-6 max-w-3xl">
          <p className="text-[11px] tracking-[0.38em] uppercase text-white/75">
            {de ? "950 SILBER • HANDGEFERTIGT IN PERU" : "950 SILVER • HANDCRAFTED IN PERU"}
          </p>

          <h1 className="text-4xl sm:text-5xl font-semibold leading-[1.05] tracking-tight">
            {de ? "Peruanisches Silber, kuratiert in Europa." : "Peruvian silver, curated in Europe."}
          </h1>

          <p className="text-white/75 text-sm sm:text-base leading-relaxed">
            {de
              ? "Schmuck mit Bedeutung — inspiriert von den Anden, sorgfältig ausgewählt, aus Deutschland versendet."
              : "Jewelry with meaning — inspired by the Andes, carefully curated, shipped from Germany."}
          </p>

          <div className="flex flex-wrap gap-3 pt-1">
            <Link
              href={`/${locale}/earrings`}
              className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium hover:opacity-90"
            >
              {de ? "Shop" : "Shop"}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-white/25 px-5 py-2 text-sm hover:bg-white/10"
            >
              {de ? "Über Manaq" : "About"}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/25 px-5 py-2 text-sm hover:bg-white/10"
            >
              {de ? "Kontakt" : "Contact"}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-4 grid gap-3 sm:grid-cols-3">
            <Badge title={de ? "Versand aus Deutschland" : "Ships from Germany"} />
            <Badge title={de ? "Limitierte Stücke" : "Limited pieces"} />
            <Badge title={de ? "Sichere Kartenzahlung" : "Secure card payment"} />
          </div>
        </div>
      </section>

      {/* QUICK CATEGORIES */}
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

      {/* FEATURED PLACEHOLDERS */}
      {/* FEATURED */}
<section className="grid gap-4 pb-6">
  <div className="flex items-end justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold text-neutral-900">
        {de ? "Highlights" : "Featured"}
      </h2>
      <p className="mt-1 text-sm text-neutral-600">
        {de
          ? "Kleine Auswahl — neue Drops regelmäßig."
          : "A small selection — new drops regularly."}
      </p>
    </div>

    <Link
      href={`/${locale}/sets`}
      className="text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
    >
      {de ? "Alle Sets →" : "All sets →"}
    </Link>
  </div>

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {/* CEREZA FEATURE CARD */}
    <Link
      href={`/${locale}/sets#cereza`}
      className="rounded-3xl border bg-white p-4 hover:bg-neutral-50 transition-colors"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100 border">
        <Image
          src="/images/sets/cereza/cereza1.png"
          alt="Cereza Set"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 500px"
        />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm font-medium text-neutral-900">Cereza</p>
        <p className="text-sm text-neutral-700">€50</p>
      </div>

      <p className="mt-1 text-xs text-neutral-500">
        {de ? "Set: Ohrringe + Anhänger • 950 Silber" : "Set: earrings + pendant • 950 silver"}
      </p>
    </Link>

    {/* Optional placeholders (we replace later with real products) */}
    {Array.from({ length: 2 }).map((_, idx) => (
      <div key={idx} className="rounded-3xl border bg-white p-4">
        <div className="aspect-[4/3] rounded-2xl bg-neutral-100 border" />
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-medium text-neutral-900">
            {de ? "Kommt bald" : "Coming soon"}
          </p>
          <p className="text-sm text-neutral-700">—</p>
        </div>
        <p className="mt-1 text-xs text-neutral-500">
          {de ? "Neue Drops" : "New drops"}
        </p>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}

function Badge({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/90 backdrop-blur">
      {title}
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