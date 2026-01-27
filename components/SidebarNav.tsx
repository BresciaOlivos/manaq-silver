"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function SidebarNav({
  locale,
  items,
}: {
  locale: string;
  items: { href: string; label: string }[];
}) {
  const pathname = usePathname();

  return (
    <nav className="px-4 pb-6 grid gap-1 text-sm">
      {items.map((it) => {
        const active = pathname === it.href || pathname?.startsWith(it.href + "/");
        return (
          <Link
            key={it.href}
            href={it.href}
            className={[
              "rounded-xl px-3 py-2 transition",
              active
                ? "bg-neutral-900 text-white"
                : "text-neutral-800 hover:bg-neutral-100",
            ].join(" ")}
            aria-current={active ? "page" : undefined}
          >
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}
