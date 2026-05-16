import { isLocale, localizePath, type Locale } from "@/i18n/routing";

export function localizeHref(href: string, locale: Locale): string {
  return localizePath(href, locale);
}

export function sanitizeNextPath(value: string | null | undefined, locale: Locale): string {
  if (!value || !value.startsWith("/")) {
    return localizeHref("/menu/admin", locale);
  }

  if (value.startsWith("//")) {
    return localizeHref("/menu/admin", locale);
  }

  const segments = value.split("/");
  const maybeLocale = segments[1];

  if (maybeLocale && isLocale(maybeLocale)) {
    return value;
  }

  return localizeHref("/menu/admin", locale);
}
