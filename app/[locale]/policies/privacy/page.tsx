import Link from "next/link";

export default async function PrivacyPolicy({
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
          {de ? "Datenschutz" : "Privacy"}
        </h1>
        <p className="text-sm text-neutral-600">
          {de
            ? "Kurz & verständlich. Volltext können wir später ergänzen."
            : "Short & clear. We can expand later if needed."}
        </p>
      </div>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Welche Daten wir nutzen" : "What data we use"}
        </h2>

        <ul className="text-sm text-neutral-700 grid gap-2">
          <li>
            {de
              ? "Kontaktdaten (z.B. E-Mail) wenn du uns schreibst."
              : "Contact data (e.g., email) when you message us."}
          </li>
          <li>
            {de
              ? "Bestelldaten (Name/Adresse) zur Lieferung."
              : "Order details (name/address) for shipping."}
          </li>
          <li>
            {de
              ? "Zahlungsabwicklung über Stripe (wir speichern keine Kartendaten)."
              : "Payments via Stripe (we do not store card details)."}
          </li>
        </ul>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Warum" : "Why"}
        </h2>
        <p className="text-sm text-neutral-700 leading-relaxed">
          {de
            ? "Damit wir Bestellungen bearbeiten, liefern und Support leisten können."
            : "So we can process orders, ship items, and provide support."}
        </p>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Kontakt" : "Contact"}
        </h2>
        <p className="text-sm text-neutral-700">
          {de
            ? "Bei Fragen schreibe uns über die Kontaktseite."
            : "If you have questions, contact us via the contact page."}
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