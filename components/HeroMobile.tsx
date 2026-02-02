
import Image from "next/image";
import Link from "next/link";

export default function HeroMobile({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  return (
    <section className="relative overflow-hidden rounded-[28px] border bg-black text-white">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero.png"
          alt="Manaq Silver"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Luxury overlay: softer, more premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/45 to-black/85" />
        {/* subtle vignette */}
        <div className="absolute inset-0 [box-shadow:inset_0_-120px_180px_rgba(0,0,0,0.65)]" />
      </div>

      {/* Content */}
      <div className="relative px-6 pt-20 pb-7 sm:px-10 sm:pt-24 sm:pb-10">
        <p className="text-[11px] tracking-[0.40em] uppercase text-white/70">
          {de ? "950 Peruanisches Silber" : "950 Peruvian Silver"}
        </p>

        <h1 className="mt-3 text-[34px] leading-[1.05] sm:text-5xl font-semibold tracking-tight">
          {de ? "Peru in Silber." : "Peru in silver."}
        </h1>

        <p className="mt-3 max-w-xl text-sm sm:text-base text-white/75 leading-relaxed">
          {de
            ? "Handgefertigte, limitierte Stücke. Versand aus Deutschland."
            : "Handcrafted, limited pieces. Ships from Germany."}
        </p>

        <div className="mt-5 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/sets`}
            className="rounded-full bg-white text-neutral-900 px-5 py-2 text-sm font-medium hover:opacity-90"
          >
            {de ? "Neuheiten" : "New in"}
          </Link>

          <Link
            href={`/${locale}/about`}
            className="rounded-full border border-white/25 px-5 py-2 text-sm hover:bg-white/10"
          >
            {de ? "Unsere Geschichte" : "Our story"}
          </Link>
        </div>

        {/* Trust chips (small, not huge blocks) */}
        <div className="mt-6 flex flex-wrap gap-2 text-[11px] text-white/80">
          <Chip>{de ? "Versand aus Deutschland" : "Ships from Germany"}</Chip>
          <Chip>{de ? "Limitierte Stücke" : "Limited pieces"}</Chip>
          <Chip>{de ? "Sichere Zahlung" : "Secure checkout"}</Chip>
        </div>
      </div>
    </section>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1">
      {children}
    </span>
  );
}