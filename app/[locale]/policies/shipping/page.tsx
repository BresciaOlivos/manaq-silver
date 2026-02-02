import Link from "next/link";

export default async function ShippingPolicy({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  return (
    <div className="grid gap-6 max-w-3xl">
      <div className="grid gap-2">
        <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
          Manaq Silver
        </div>
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          {de ? "Versand" : "Shipping"}
        </h1>
        <p className="text-sm text-neutral-600">
          {de
            ? "Versand aus Deutschland. Preise & Lieferzeiten (DE/EU)."
            : "Ships from Germany. Prices & delivery times (DE/EU)."}
        </p>
      </div>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Versandkosten" : "Shipping costs"}
        </h2>

        <ul className="text-sm text-neutral-700 grid gap-2">
          <li>
            <span className="font-medium">{de ? "Deutschland:" : "Germany:"}</span>{" "}
            {de ? "4€ Versand — kostenlos ab 55€" : "€4 shipping — free over €55"}
          </li>
          <li>
            <span className="font-medium">{de ? "EU:" : "EU:"}</span>{" "}
            {de ? "7€ Versand — kostenlos ab 85€" : "€7 shipping — free over €85"}
          </li>
        </ul>

        <p className="text-xs text-neutral-500">
          {de
            ? "Hinweis: Diese Werte sind die aktuellen Zielwerte. Wir können sie später im Layout zentral ändern."
            : "Note: These are the current target values. We can later centralize them as a single setting."}
        </p>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Bearbeitung & Lieferzeit" : "Processing & delivery time"}
        </h2>

        <ul className="text-sm text-neutral-700 grid gap-2">
          <li>
            {de
              ? "Bearbeitung: 1–2 Werktage."
              : "Processing: 1–2 business days."}
          </li>
          <li>
            {de
              ? "Deutschland: meist 2–4 Werktage."
              : "Germany: usually 2–4 business days."}
          </li>
          <li>
            {de
              ? "EU: meist 3–8 Werktage."
              : "EU: usually 3–8 business days."}
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Sendungsverfolgung" : "Tracking"}
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          {de
            ? "Wenn Tracking verfügbar ist, erhältst du eine Bestätigungs-E-Mail mit Link."
            : "If tracking is available, you’ll receive a confirmation email with a link."}
        </p>
      </section>

      <Link
        href={`/${locale}/policies`}
        className="text-sm text-neutral-700 underline"
      >
        {de ? "← Zurück zu Richtlinien" : "← Back to Policies"}
      </Link>
    </div>
  );
}