import Link from "next/link";
import { Hero } from "@/components/Hero";

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale === "de" ? "de" : "en";
  const de = locale === "de";

  return (
    <div className="grid gap-10">
      <Hero locale={locale} />
      <section className="relative overflow-hidden rounded-[28px] border bg-black">
        {/* Background image (desktop) */}
        <div
          className="hidden md:block absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-desktop.jpg)" }}
        />
        {/* Background image (mobile) */}
        <div
          className="md:hidden absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url(/hero-mobile.jpg)" }}
        />

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative p-8 md:p-14 grid gap-6 max-w-3xl">
          <p className="text-xs tracking-[0.35em] uppercase text-white/80">
            {de ? "950 Peruanisches Silber" : "950 Peruvian Silver"}
          </p>

          <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white">
            {de
              ? "Peruanisches Silber, kuratiert in Europa."
              : "Peruvian silver, curated in Europe."}
          </h1>

          <p className="text-white/80">
            {de
              ? "Limitierte Stücke. 15 Minuten reservieren, sicher online bezahlen, Versand aus Deutschland."
              : "Limited pieces. Reserve for 15 minutes, pay securely online, shipped from Germany."}
          </p>

          <div className="flex flex-wrap gap-3">
            <Link
              href={`/${locale}/earrings`}
              className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:bg-white/90 transition"
            >
              {de ? "Jetzt shoppen" : "Shop now"}
            </Link>

            <Link
              href={`/${locale}/about`}
              className="rounded-full border border-white/70 text-white px-5 py-2 text-sm font-medium hover:border-white transition"
            >
              {de ? "Über Manaq" : "About Manaq"}
            </Link>

            <Link
              href={`/${locale}/contact`}
              className="rounded-full border border-white/70 text-white px-5 py-2 text-sm font-medium hover:border-white transition"
            >
              {de ? "Kontakt" : "Contact"}
            </Link>
          </div>

          {/* Trust badges */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
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
    </div>
  );
}

function Badge({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white backdrop-blur">
      {title}
    </div>
  );
}

function Cat({ locale, href, title }: { locale: string; href: string; title: string }) {
  return (
    <Link
      href={`/${locale}/${href}`}
      className="rounded-[22px] border bg-white p-6 hover:bg-neutral-50 transition"
    >
      <div className="text-sm tracking-[0.25em] uppercase text-neutral-600">
        Manaq
      </div>
      <div className="mt-2 text-xl font-semibold">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">
        {locale === "de" ? "Entdecken →" : "Explore →"}
      </div>
    </Link>
  );
}