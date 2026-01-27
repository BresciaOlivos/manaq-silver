import Link from "next/link";

const nav = [
  { label: "Earrings", href: "/earrings" },
  { label: "Necklaces", href: "/necklaces" },
  { label: "Rings", href: "/rings" },
  { label: "Sets", href: "/sets" },
  { label: "Pendants", href: "/pendants" },
  { label: "About", href: "/about" },
  { label: "Cart", href: "/cart" },
];

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="glass border-x-0 border-t-0 hairline">
        <div className="container-x flex h-14 items-center justify-between">
          <Link href="/" className="text-sm font-semibold tracking-wide">
            Manaq Silver
          </Link>

          <nav className="hidden md:flex items-center gap-6 text-sm text-white/60">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="hover:text-white transition-colors"
              >
                {i.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <p className="hidden lg:block text-xs text-white/50">
              EU shipping • Free shipping depends on country/order value
            </p>

            <div className="flex overflow-hidden rounded-full border hairline bg-white/5">
              <button className="px-3 py-1.5 text-xs text-white bg-white/10">DE</button>
              <div className="w-px bg-white/10" />
              <button className="px-3 py-1.5 text-xs text-white/70 hover:text-white transition-colors">
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
