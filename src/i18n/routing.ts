export const locales = ["pt", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt";

export const localeConfig: Record<
  Locale,
  { htmlLang: string; label: string; name: string }
> = {
  pt: {
    htmlLang: "pt-PT",
    label: "PT",
    name: "Português",
  },
  en: {
    htmlLang: "en-US",
    label: "EN",
    name: "English",
  },
};

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function getPathWithoutLocale(pathname: string) {
  const segments = pathname.split("/");
  const firstSegment = segments[1];

  if (firstSegment && isLocale(firstSegment)) {
    const path = `/${segments.slice(2).join("/")}`;
    return path === "/" ? "/" : path.replace(/\/$/, "");
  }

  return pathname || "/";
}

export function localizePath(href: string, locale: Locale) {
  if (
    href.startsWith("#") ||
    href.startsWith("http") ||
    href.startsWith("mailto:") ||
    href.startsWith("tel:")
  ) {
    return href;
  }

  const path = href === "/" ? "" : href;
  return `/${locale}${path}`;
}
