import Link from "next/link";

export function Hero({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  return (
    <section className="relative overflow-hidden rounded-[28px] border bg-white">
      {/* Background placeholder */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-white to-neutral-100" />

      {/* Content */}
      <div className="relative z-10 max-w-3xl px-6 py-14 md:px-14 md:py-20">
        <p className="text-xs tracking-[0.35em] uppercase text-neutral-600">
          {de ? "950 Peruanisches Silber" : "950 Peruvian Silver"}
        </p>

        <h1 className="mt-4 text-4xl md:text-5xl font-semibold leading-tight text-neutral-900">
          {de
            ? "Peruanisches Silber, kuratiert in Europa."
            : "Peruvian silver, curated in Europe."}
        </h1>

        <p className="mt-4 text-neutral-700">
          {de
            ? "Limitierte Stücke. 15 Minuten reservieren, sicher bezahlen, Versand aus Deutschland."
            : "Limited pieces. Reserve for 15 minutes, pay securely, shipped from Germany."}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href={`/${locale}/earrings`}
            className="rounded-full bg-neutral-900 text-white px-6 py-2.5 text-sm hover:opacity-90"
          >
            {de ? "Shop entdecken" : "Shop now"}
          </Link>

          <Link
            href={`/${locale}/about`}
            className="rounded-full border px-6 py-2.5 text-sm hover:bg-neutral-50"
          >
            {de ? "Über Manaq" : "About Manaq"}
          </Link>
        </div>

        {/* Trust line */}
        <div className="mt-10 flex flex-wrap gap-4 text-xs text-neutral-600">
          <span>• {de ? "Versand aus Deutschland" : "Ships from Germany"}</span>
          <span>• {de ? "Limitierte Stücke" : "Limited pieces"}</span>
          <span>• {de ? "Sichere Zahlung" : "Secure checkout"}</span>
        </div>
      </div>
    </section>
  );
}