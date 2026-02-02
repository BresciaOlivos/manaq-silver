import Link from "next/link";

export default async function PoliciesHub({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = rawLocale === "de" ? "de" : "en";
  const de = locale === "de";

  const t = {
    title: de ? "Richtlinien" : "Policies",
    subtitle: de
      ? "Versand, Rückgabe, Datenschutz — transparent & einfach."
      : "Shipping, returns, privacy — clear and simple.",
    cards: [
      {
        href: `/${locale}/policies/shipping`,
        title: de ? "Versand" : "Shipping",
        desc: de
          ? "Lieferzeiten & Kosten (DE/EU)."
          : "Delivery times & costs (DE/EU).",
      },
      {
        href: `/${locale}/policies/returns`,
        title: de ? "Rückgabe & Widerruf" : "Returns & cancellation",
        desc: de
          ? "Widerrufsrecht & Rückgabeprozess."
          : "Cancellation rights & return process.",
      },
      {
        href: `/${locale}/policies/privacy`,
        title: de ? "Datenschutz" : "Privacy",
        desc: de
          ? "Wie wir Daten verarbeiten."
          : "How we handle your data.",
      },
    ],
  };

  return (
    <div className="grid gap-8">
      <header className="grid gap-2">
        <h1 className="text-3xl font-semibold tracking-tight text-neutral-900">
          {t.title}
        </h1>
        <p className="text-sm text-neutral-600">{t.subtitle}</p>
      </header>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {t.cards.map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="rounded-3xl border bg-white p-6 hover:bg-neutral-50 transition"
          >
            <div className="text-sm tracking-[0.25em] uppercase text-neutral-500">
              Manaq
            </div>
            <div className="mt-2 text-lg font-semibold text-neutral-900">
              {c.title}
            </div>
            <div className="mt-2 text-sm text-neutral-600">{c.desc}</div>
            <div className="mt-4 text-sm text-neutral-700">
              {de ? "Öffnen →" : "Open →"}
            </div>
          </Link>
        ))}
      </section>

      <div className="text-xs text-neutral-500">
        {de
          ? "Hinweis: Das ist eine Vorlage. Wir passen Details (Adresse/Impressum) später an."
          : "Note: This is a template. We’ll customize details (address/imprint) later."}
      </div>
    </div>
  );
}