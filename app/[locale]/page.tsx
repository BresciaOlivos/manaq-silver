import HeroMobile from "@/components/HeroMobile";
import HighlightsRow from "@/components/HighlightsRow";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabaseServer";

const supported = ["de", "en"] as const;

type DbProduct = {
  id: string;
  name_en: string;
  name_de: string;
  price: number;
  category: string;
  images: string[] | null;
  // if you also have a single image field, keep it optional:
  image?: string | null;
  created_at?: string | null;
};

function coverFrom(p: DbProduct): string {
  const arr = Array.isArray(p.images) ? p.images.filter(Boolean) : [];
  const first = arr[0]?.trim();
  const legacy = (p.image ?? "").trim();
  return first || legacy || "/placeholder.jpg";
}

function titleFor(p: DbProduct, locale: "de" | "en") {
  return locale === "de" ? p.name_de : p.name_en;
}

// picks 2 items, preferably from different categories, avoiding duplicates
function pickHighlights(all: DbProduct[], locale: "de" | "en") {
  const seen = new Set<string>();
  const usedCats = new Set<string>();

  const picked: DbProduct[] = [];
  for (const p of all) {
    if (seen.has(p.id)) continue;
    if (usedCats.has(p.category) && picked.length < 2) continue; // prefer variety
    picked.push(p);
    seen.add(p.id);
    usedCats.add(p.category);
    if (picked.length >= 2) break;
  }

  // fallback if we couldn't get variety
  if (picked.length < 2) {
    for (const p of all) {
      if (seen.has(p.id)) continue;
      picked.push(p);
      seen.add(p.id);
      if (picked.length >= 2) break;
    }
  }

  return picked.map((p) => ({
    id: p.id,
    title: { de: p.name_de, en: p.name_en },
    subtitle: {
      de: `${p.category} • 950 Silber`,
      en: `${p.category} • 950 silver`,
    },
    price: p.price,
    href: `/product/${p.id}`,
    imageSrc: coverFrom(p),
  }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: "de" | "en" = supported.includes(rawLocale as any)
    ? (rawLocale as any)
    : "en";
  const de = locale === "de";

  const supabase = getSupabaseServer();

  // newest first (you can swap to .order("updated_at"... if you have that)
  const { data } = await supabase
    .from("products")
    .select("id,name_en,name_de,price,category,images,image,created_at")
    .order("created_at", { ascending: false })
    .limit(30);

  const products = (data ?? []) as DbProduct[];

  const highlights = pickHighlights(products, locale);

  return (
    <div className="grid gap-10">
      <HeroMobile locale={locale} />

      {/* ===== HIGHLIGHTS (luxury row + filter) ===== */}
      <section className="grid gap-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">
              {de ? "Neu & beliebt" : "New & loved"}
            </h2>
            <p className="text-sm text-neutral-600">
              {de ? "Kuratierte Auswahl — limitiert." : "Curated picks — limited pieces."}
            </p>
          </div>

          <Link
            href={`/${locale}/shop`}
            className="text-sm text-neutral-800 hover:underline"
          >
            {de ? "Alle ansehen →" : "View all →"}
          </Link>
        </div>

        <HighlightsRow locale={locale} items={highlights} />
      </section>

      {/* ===== CATEGORY GRID (clean + luxury) ===== */}
      <section className="grid gap-4">
        <h2 className="text-lg font-semibold text-neutral-900">
          {de ? "Shop" : "Shop"}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <Cat locale={locale} href="earrings" title={de ? "Ohrringe" : "Earrings"} />
          <Cat locale={locale} href="rings" title={de ? "Ringe" : "Rings"} />
          <Cat locale={locale} href="sets" title="Sets" />
          <Cat locale={locale} href="bracelets" title={de ? "Armbänder" : "Bracelets"} />
          <Cat locale={locale} href="pendants" title={de ? "Anhänger" : "Pendants"} />
          <Cat locale={locale} href="necklaces" title={de ? "Ketten" : "Necklaces"} />
        </div>
      </section>

      {/* ===== Artisan / Luxury Story Strip ===== */}
      <section className="rounded-[28px] border bg-white p-6 sm:p-8 grid gap-3">
        <div className="text-[11px] tracking-[0.35em] uppercase text-neutral-500">
          Manaq Silver • 950
        </div>
        <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900">
          {de ? "Peru in jedem Detail." : "Peru in every detail."}
        </h3>
        <p className="text-sm sm:text-base text-neutral-700 leading-relaxed max-w-2xl">
          {de
            ? "Handveredelte Stücke aus 950er Silber — kuratiert in Europa. Limitiert, sorgfältig verpackt und schnell versendet."
            : "Hand-finished pieces in 950 silver — curated in Europe. Limited, carefully packed, and shipped fast."}
        </p>

        <div className="flex flex-wrap gap-3 pt-2">
          <Link
            href={`/${locale}/about`}
            className="rounded-full bg-neutral-900 text-white px-5 py-2 text-sm hover:opacity-90"
          >
            {de ? "Unsere Story" : "Our story"}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="rounded-full border px-5 py-2 text-sm hover:bg-neutral-50"
          >
            {de ? "Kontakt" : "Contact"}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Cat({ locale, href, title }: { locale: string; href: string; title: string }) {
  return (
    <Link
      href={`/${locale}/${href}`}
      className="rounded-[22px] border bg-white p-6 hover:bg-neutral-50 transition"
    >
      <div className="text-[11px] tracking-[0.25em] uppercase text-neutral-500">
        Manaq
      </div>
      <div className="mt-2 text-xl font-semibold text-neutral-900">{title}</div>
      <div className="mt-2 text-sm text-neutral-600">
        {locale === "de" ? "Entdecken →" : "Explore →"}
      </div>
    </Link>
  );
}