import { SidebarNav } from "@/components/SidebarNav";
import Link from "next/link";
import { LocaleSwitcher } from "@/components/LocaleSwitcher";
import { CartProvider } from "@/components/CartProvider";
import { ReservationJanitor } from "@/components/ReservationJanitor";

const supported = ["de", "en"] as const;

function labels(locale: string) {
  const de = locale === "de";
  return {
    brand: "Manaq Silver",
    tagline: de
      ? "950 Peruanisches Silber • Versand aus Deutschland"
      : "950 Peruvian Silver • Ships from Germany",
    nav: {
      earrings: de ? "Ohrringe" : "Earrings",
      necklaces: de ? "Ketten" : "Necklaces",
      rings: de ? "Ringe" : "Rings",
      sets: "Sets",
      pendants: de ? "Anhänger" : "Pendants",
      about: de ? "Über uns" : "About",
      contact: de ? "Kontakt" : "Contact",
      cart: de ? "Warenkorb" : "Cart",
    },
    shippingLine: de
      ? "DE: 4€ • frei ab 55€  |  EU: 7€ • frei ab 85€"
      : "DE: €4 • free over €55  |  EU: €7 • free over €85",
  };
}

export default function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const locale = supported.includes(params.locale as any) ? params.locale : "en";
  const t = labels(locale);

  return (
    <CartProvider>
      <ReservationJanitor />

      <div className="min-h-screen grid lg:grid-cols-[280px_1fr]">
        {/* Sidebar (desktop) */}
        <aside className="hidden lg:flex flex-col border-r bg-neutral-50">
  <div className="px-6 pt-8 pb-6">
    <Link
      href={`/${locale}`}
      className="block text-sm font-semibold tracking-[0.35em] uppercase text-neutral-900"
    >
      {t.brand}
    </Link>

    <div className="mt-2 text-xs text-neutral-600">{t.tagline}</div>

    <div className="mt-4 rounded-2xl border bg-white px-4 py-3 text-[11px] text-neutral-700">
      {t.shippingLine}
    </div>
  </div>

  <SidebarNav
    locale={locale}
    items={[
      { href: `/${locale}/earrings`, label: t.nav.earrings },
      { href: `/${locale}/necklaces`, label: t.nav.necklaces },
      { href: `/${locale}/rings`, label: t.nav.rings },
      { href: `/${locale}/sets`, label: t.nav.sets },
      { href: `/${locale}/pendants`, label: t.nav.pendants },
      { href: `/${locale}/about`, label: t.nav.about },
      { href: `/${locale}/contact`, label: t.nav.contact },
    ]}
  />

  <div className="mt-auto px-4 pb-6 grid gap-3">
    <Link
      href={`/${locale}/cart`}
      className="rounded-2xl bg-neutral-900 text-white px-4 py-2 text-sm hover:opacity-90"
    >
      {t.nav.cart}
    </Link>

    <div className="rounded-full border bg-white overflow-hidden w-fit">
      <LocaleSwitcher locale={locale as "de" | "en"} />
    </div>

    <div className="text-[11px] text-neutral-500">
      © {new Date().getFullYear()} Manaq Silver
    </div>
  </div>
</aside>


        {/* Top bar (mobile/tablet) */}
        <header className="lg:hidden sticky top-0 z-20 border-b bg-white/85 backdrop-blur">
          <div className="px-4 py-4 flex items-center justify-between">
            <Link
              href={`/${locale}`}
              className="text-sm font-semibold tracking-[0.35em] uppercase"
            >
              {t.brand}
            </Link>

            <div className="flex items-center gap-2">
              <Link
                href={`/${locale}/cart`}
                className="rounded-full border px-3 py-1 text-sm"
              >
                {t.nav.cart}
              </Link>
              <div className="rounded-full border overflow-hidden">
                <LocaleSwitcher locale={locale as "de" | "en"} />
              </div>
            </div>
          </div>

          <div className="px-4 pb-3 text-[11px] text-neutral-600">{t.shippingLine}</div>

          <div className="px-4 pb-4 flex gap-2 overflow-x-auto text-sm">
            <Chip href={`/${locale}/earrings`} label={t.nav.earrings} />
            <Chip href={`/${locale}/necklaces`} label={t.nav.necklaces} />
            <Chip href={`/${locale}/rings`} label={t.nav.rings} />
            <Chip href={`/${locale}/sets`} label={t.nav.sets} />
            <Chip href={`/${locale}/pendants`} label={t.nav.pendants} />
            <Chip href={`/${locale}/about`} label={t.nav.about} />
            <Chip href={`/${locale}/contact`} label={t.nav.contact} />
          </div>
        </header>

        {/* Main */}
        <main className="px-4 py-8 lg:px-10 lg:py-12 max-w-6xl">
          {children}
        </main>
      </div>
    </CartProvider>
  );
}

function NavLink({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="rounded-xl px-3 py-2 hover:bg-neutral-50">
      {label}
    </Link>
  );
}

function Chip({ href, label }: { href: string; label: string }) {
  return (
    <Link href={href} className="shrink-0 rounded-full border px-3 py-1 hover:bg-neutral-50">
      {label}
    </Link>
  );
}
