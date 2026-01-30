
import Image from "next/image";
import Link from "next/link";

export default function HeroMobile({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  return (
    <section className="relative overflow-hidden rounded-3xl border bg-black text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.png"
          alt="Manaq Silver"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/55 to-black/85" />
      </div>

      <div className="relative p-6 sm:p-10 md:p-14 grid gap-5 max-w-3xl">
        <p className="text-[11px] tracking-[0.35em] uppercase text-white/70">
          {de ? "950 Peruanisches Silber" : "950 Peruvian Silver"}
        </p>

        <h1 className="text-3xl sm:text-5xl font-semibold leading-tight tracking-tight">
          {de
            ? "Peruanisches Silber, kuratiert in Europa."
            : "Peruvian silver, curated in Europe."}
        </h1>

        <p className="text-white/75 text-sm sm:text-base leading-relaxed max-w-2xl">
          {de
            ? "Limitierte Stücke. 15 Minuten reservieren, sicher online bezahlen, Versand aus Deutschland."
            : "Limited pieces. Reserve for 15 minutes, pay securely online, shipped from Germany."}
        </p>

        <div className="flex flex-wrap gap-3 pt-1">
          <Link
            href={`/${locale}/sets`}
            className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium hover:opacity-90"
          >
            {de ? "Shop" : "Shop"}
          </Link>

          <Link
            href={`/${locale}/about`}
            className="rounded-full border border-white/25 px-5 py-2 text-sm hover:bg-white/10"
          >
            {de ? "Über Manaq" : "About Manaq"}
          </Link>

          <Link
            href={`/${locale}/contact`}
            className="rounded-full border border-white/25 px-5 py-2 text-sm hover:bg-white/10"
          >
            {de ? "Kontakt" : "Contact"}
          </Link>
        </div>
      </div>
    </section>
  );
}
