import Link from "next/link";

export default function ContactPage({ params }: { params: { locale: string } }) {
  const locale = params.locale === "de" ? "de" : "en";
  const de = locale === "de";

  // TODO: replace with your real links
  const whatsapp = "https://wa.me/491234567890";
  const instagram = "https://instagram.com/your_manaq_account";
  const email = "mailto:hello@manaqsilver.com";

  return (
    <div className="max-w-xl grid gap-6">
      <h1 className="text-3xl font-semibold">{de ? "Kontakt" : "Contact"}</h1>
      <p className="text-neutral-700">
        {de
          ? "Schreib uns – wir antworten schnell."
          : "Message us — we reply quickly."}
      </p>

      <div className="grid gap-3">
        <a className="rounded-xl border p-4 hover:bg-neutral-50" href={whatsapp} target="_blank">
          WhatsApp
        </a>
        <a className="rounded-xl border p-4 hover:bg-neutral-50" href={instagram} target="_blank">
          Instagram DM
        </a>
        <a className="rounded-xl border p-4 hover:bg-neutral-50" href={email}>
          Email
        </a>
      </div>

      <Link className="text-sm underline text-neutral-700" href={`/${locale}`}>
        {de ? "Zurück" : "Back"}
      </Link>
    </div>
  );
}
