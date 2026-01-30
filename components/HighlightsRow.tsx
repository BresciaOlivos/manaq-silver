import Image from "next/image";
import Link from "next/link";

type HighlightItem = {
  id: string;
  title: { de: string; en: string };
  subtitle: { de: string; en: string };
  price: number;
  href: string;
  imageSrc: string;
};

export default function HighlightsRow({
  locale,
  items,
}: {
  locale: "de" | "en";
  items: HighlightItem[];
}) {
  const de = locale === "de";

  return (
    <section className="grid gap-4">
      <div className="flex items-end justify-between">
        <h2 className="text-lg font-semibold">{de ? "Neu & Highlights" : "New & Highlights"}</h2>

        <Link
          href={`/${locale}/sets`}
          className="text-sm text-neutral-600 hover:text-neutral-900"
        >
          {de ? "Alle ansehen →" : "View all →"}
        </Link>
      </div>

      {/* Mobile: horizontal swipe */}
      <div className="md:hidden -mx-4 px-4 overflow-x-auto">
        <div className="flex gap-4 snap-x snap-mandatory">
          {items.map((it) => (
            <Link
              key={it.id}
              href={it.href}
              className="snap-start shrink-0 w-[78%] rounded-3xl border bg-white overflow-hidden"
            >
              <div className="relative aspect-[4/3] bg-neutral-100">
                <Image
                  src={it.imageSrc}
                  alt={it.title[locale]}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="p-4 grid gap-1">
                <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                  Manaq Silver
                </div>
                <div className="text-base font-semibold text-neutral-900">
                  {it.title[locale]}
                </div>
                <div className="text-sm text-neutral-600">
                  {it.subtitle[locale]}
                </div>
                <div className="pt-1 text-sm font-medium text-neutral-900">
                  €{it.price}
                </div>
                <div className="pt-2 text-sm text-neutral-700">
                  {de ? "Ansehen →" : "View →"}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Desktop: grid */}
      <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            className="rounded-3xl border bg-white overflow-hidden hover:shadow-lg transition"
          >
            <div className="relative aspect-[4/3] bg-neutral-100">
              <Image
                src={it.imageSrc}
                alt={it.title[locale]}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-4 grid gap-1">
              <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
                Manaq Silver
              </div>
              <div className="text-base font-semibold text-neutral-900">
                {it.title[locale]}
              </div>
              <div className="text-sm text-neutral-600">
                {it.subtitle[locale]}
              </div>
              <div className="pt-1 text-sm font-medium text-neutral-900">
                €{it.price}
              </div>
              <div className="pt-2 text-sm text-neutral-700">
                {de ? "Ansehen →" : "View →"}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}