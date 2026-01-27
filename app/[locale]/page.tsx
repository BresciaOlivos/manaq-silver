import Link from "next/link";

export default function Home({ params }: { params: { locale: string } }) {
  const locale = params.locale === "de" ? "de" : "en";
  const de = locale === "de";

  return (
    <div className="grid gap-8">
      <div className="grid gap-3">
        <h1 className="text-4xl font-semibold tracking-tight">
          {de ? "Peruanisches Silber, kuratiert in Europa." : "Peruvian silver, curated in Europe."}
        </h1>
        <p className="max-w-2xl text-neutral-700">
          {de
            ? "Limitierte Stücke. 15 Minuten reservieren, sicher online bezahlen, EU-weit Versand aus Deutschland."
            : "Limited pieces. Reserve for 15 minutes, pay securely online, and we ship across the EU from Germany."}
        </p>

        <div className="flex gap-3 pt-2">
          <Link
            href={`/${locale}/earrings`}
            className="rounded-lg bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:opacity-90"
          >
            {de ? "Shop" : "Shop"}
          </Link>
          <Link
            href={`/${locale}/about`}
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-neutral-50"
          >
            {de ? "Über Manaq" : "About Manaq"}
          </Link>
        </div>
      </div>
    </div>
  );
}

