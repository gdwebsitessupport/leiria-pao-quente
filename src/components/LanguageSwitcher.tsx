"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  getPathWithoutLocale,
  localeConfig,
  locales,
  localizePath,
  type Locale,
} from "@/i18n/routing";

type LanguageSwitcherProps = {
  ariaLabel: string;
  currentLocale: Locale;
};

export function LanguageSwitcher({
  ariaLabel,
  currentLocale,
}: LanguageSwitcherProps) {
  const pathname = usePathname();
  const pathWithoutLocale = getPathWithoutLocale(pathname);

  return (
    <nav
      aria-label={ariaLabel}
      className="flex h-10 shrink-0 items-center rounded-full border border-ink/10 bg-white p-1 shadow-sm"
    >
      {locales.map((locale) => {
        const active = locale === currentLocale;
        const href = localizePath(pathWithoutLocale, locale);

        return (
          <Link
            key={locale}
            href={href}
            aria-current={active ? "true" : undefined}
            className={`grid h-8 min-w-10 place-items-center rounded-full px-2 text-xs font-extrabold uppercase transition ${
              active
                ? "bg-olive text-cream"
                : "text-stone hover:bg-flour hover:text-ink"
            }`}
            title={localeConfig[locale].name}
          >
            {localeConfig[locale].label}
          </Link>
        );
      })}
    </nav>
  );
}
