import Link from "next/link";

export default async function ReturnsPolicy({
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
          {de ? "Rückgabe & Widerruf" : "Returns & cancellation"}
        </h1>
        <p className="text-sm text-neutral-600">
          {de
            ? "Einfache Regeln. Wir halten es fair & transparent."
            : "Simple rules. Fair and transparent."}
        </p>
      </div>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Widerrufsrecht" : "Cancellation"}
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          {de
            ? "Du kannst deine Bestellung innerhalb von 14 Tagen widerrufen (EU-Verbraucherrecht), sofern die Ware ungetragen und im Originalzustand ist."
            : "You can cancel your order within 14 days (EU consumer rights), as long as items are unworn and in original condition."}
        </p>

        <p className="text-xs text-neutral-500">
          {de
            ? "Wichtig: Personalisierte/maßgefertigte Produkte sind üblicherweise ausgeschlossen. (Wir fügen das später hinzu, sobald Personalization live ist.)"
            : "Important: Personalized/custom items are usually excluded. (We’ll add this once personalization goes live.)"}
        </p>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "So funktioniert die Rückgabe" : "How returns work"}
        </h2>

        <ol className="list-decimal pl-5 text-sm text-neutral-700 grid gap-2">
          <li>
            {de
              ? "Schreibe uns (Kontaktseite) mit Bestellnummer und Grund."
              : "Message us (Contact page) with your order number and reason."}
          </li>
          <li>
            {de
              ? "Wir bestätigen die Rückgabe und senden die Adresse."
              : "We confirm and send the return address."}
          </li>
          <li>
            {de
              ? "Sende die Ware sicher verpackt zurück."
              : "Ship items back safely packaged."}
          </li>
          <li>
            {de
              ? "Nach Prüfung erstatten wir den Betrag auf die ursprüngliche Zahlungsmethode."
              : "After inspection, we refund to the original payment method."}
          </li>
        </ol>
      </section>

      <section className="rounded-3xl border bg-white p-6 grid gap-3">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Rücksendekosten" : "Return shipping costs"}
        </h2>

        <p className="text-sm text-neutral-700 leading-relaxed">
          {de
            ? "Rücksendekosten trägt in der Regel der Käufer, außer bei fehlerhafter Ware."
            : "Return shipping is usually paid by the buyer unless the item is defective."}
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