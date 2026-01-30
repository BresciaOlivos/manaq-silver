import Image from "next/image";
import Link from "next/link";

export function Hero({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  return (
    <section className="relative overflow-hidden rounded-[28px] border bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.jpg"
          alt="Manaq Silver hero"
          fill
          priority
          className="object-cover object-center opacity-85"
        />
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/20" />
        {/* Soft vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.10),transparent_55%)]" />
      </div>

      {/* Content */}
      <div className="relative px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16 max-w-3xl">
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
          {de ? "950 Silber • Handgefertigt in Peru" : "950 Silver • Handcrafted in Peru"}
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-semibold leading-[1.05] text-white">
          {de ? "Peruanisches Silber, kuratiert in Europa." : "Peruvian silver, curated in Europe."}
        </h1>

        <p className="mt-4 text-sm sm:text-base text-white/70 max-w-xl leading-relaxed">
          {de
            ? "Limitierte Stücke. 15 Minuten reservieren, sicher online bezahlen, Versand aus Deutschland."
            : "Limited pieces. Reserve for 15 minutes, pay securely online, shipped from Germany."}
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/earrings`}
            className="rounded-full bg-white text-black px-5 py-2 text-sm font-medium hover:opacity-90"
          >
            {de ? "Shop" : "Shop"}
          </Link>

          <Link
            href={`/${locale}/about`}
            className="rounded-full border border-white/30 bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            {de ? "Über Manaq" : "About Manaq"}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-white/30 bg-white/5 px-5 py-2 text-sm font-medium text-white hover:bg-white/10"
          >
            {de ? "Kontakt" : "Contact"}
          </Link>
        </div>

        {/* Trust badges */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Badge title={de ? "Versand aus Deutschland" : "Ships from Germany"} />
          <Badge title={de ? "Limitierte Stücke" : "Limited pieces"} />
          <Badge title={de ? "Sichere Kartenzahlung" : "Secure card payment"} />
        </div>
      </div>
    </section>
  );
}

function Badge({ title }: { title: string }) {
  return (
    <div className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white/80 backdrop-blur">
      {title}
    </div>
  );
}