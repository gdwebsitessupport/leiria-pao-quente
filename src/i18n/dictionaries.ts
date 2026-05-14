import "server-only";
import { notFound } from "next/navigation";
import { isLocale, type Locale } from "@/i18n/routing";

const dictionaries = {
  pt: () => import("@/i18n/messages/pt").then((module) => module.default),
  en: () => import("@/i18n/messages/en").then((module) => module.default),
};

export async function getDictionary(locale: Locale) {
  return dictionaries[locale]();
}

export function getValidLocale(locale: string): Locale {
  if (!isLocale(locale)) {
    notFound();
  }

  return locale;
}
