import type { Metadata } from "next";
import { localeConfig, locales, localizePath, type Locale } from "@/i18n/routing";

export function getLocalizedAlternates(path: string, locale: Locale): Metadata["alternates"] {
  return {
    canonical: localizePath(path, locale),
    languages: Object.fromEntries(
      locales.map((item) => [localeConfig[item].htmlLang, localizePath(path, item)]),
    ),
  };
}
