"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function LocaleSwitcher({ locale }: { locale: "de" | "en" }) {
  const pathname = usePathname(); // e.g. /en/product/earrings-1

  const otherLocale: "de" | "en" = locale === "de" ? "en" : "de";

  // Replace ONLY the first segment (/en or /de)
  const toDe = pathname.replace(/^\/(en|de)(\/|$)/, "/de$2");
  const toEn = pathname.replace(/^\/(en|de)(\/|$)/, "/en$2");

  return (
    <div className="flex items-center rounded-lg border overflow-hidden">
      <Link
        href={toDe}
        className={`px-3 py-1 ${
          locale === "de" ? "bg-neutral-900 text-white" : "bg-white text-neutral-800"
        }`}
      >
        DE
      </Link>

      <span className="px-2 text-neutral-400 select-none">|</span>

      <Link
        href={toEn}
        className={`px-3 py-1 ${
          locale === "en" ? "bg-neutral-900 text-white" : "bg-white text-neutral-800"
        }`}
      >
        EN
      </Link>
    </div>
  );
}
