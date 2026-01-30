import Link from "next/link";
import Image from "next/image";

type FeaturedItem = {
  id: string;
  name: { de: string; en: string };
  price: number;
  image: string; // public path
  href: string;  // link to product page or category
};

export function FeaturedRow({ locale }: { locale: "de" | "en" }) {
  const de = locale === "de";

  // ✅ For now we hardcode. Later we pull from Supabase.
  const items: FeaturedItem[] = [
    {
      id: "cereza",
      name: { de: "Set Cereza", en: "Cereza Set" },
      price: 50,
      image: "/images/sets/cereza/cereza1.png",
      href: `/${locale}/sets`,
    },
    {
      id: "tumi",
      name: { de: "Peru-Anhänger", en: "Peru Pendant" },
      price: 90,
      image: "/images/pendants/peru/peru1.png", // you will add later
      href: `/${locale}/pendants`,
    },
  ];

  return (
    <section className="grid gap-3">
      <div className="flex items-end justify-between">
        <h2 className="text-base font-semibold">
          {de ? "Neu & Highlights" : "New Highlights"}
        </h2>
        <Link
          href={`/${locale}/sets`}
          className="text-sm text-neutral-600 hover:text-neutral-900"
        >
          {de ? "Mehr →" : "See more →"}
        </Link>
      </div>

      {/* horizontal scroll */}
      <div className="-mx-4 px-4 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
        {items.map((it) => (
          <Link
            key={it.id}
            href={it.href}
            className="snap-start shrink-0 w-[78%] sm:w-[46%] rounded-3xl border bg-white overflow-hidden"
          >
            <div className="relative h-52 bg-neutral-100">
              <Image src={it.image} alt={it.name[locale]} fill className="object-cover" />
            </div>

            <div className="p-4 grid gap-1">
              <div className="text-sm font-medium">{it.name[locale]}</div>
              <div className="text-sm text-neutral-600">€{it.price}</div>

              <div className="pt-2">
                <span className="inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm hover:bg-neutral-50">
                  {de ? "Ansehen" : "View"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}