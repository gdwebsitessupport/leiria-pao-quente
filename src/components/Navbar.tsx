"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Dictionary } from "@/i18n/messages/pt";
import {
  getPathWithoutLocale,
  localizePath,
  type Locale,
} from "@/i18n/routing";

type NavbarProps = {
  business: Dictionary["business"];
  labels: Dictionary["shell"];
  locale: Locale;
  navigation: Dictionary["navigation"];
};

export function Navbar({ business, labels, locale, navigation }: NavbarProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const activePath = getPathWithoutLocale(pathname);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-cream/88 backdrop-blur-xl">
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link
          href={localizePath("/", locale)}
          className="group flex items-center gap-3"
          onClick={() => setOpen(false)}
        >
          <span className="grid h-11 w-11 place-items-center rounded-full bg-olive text-lg font-black text-cream shadow-lg shadow-olive/15">
            DS
          </span>
          <span className="leading-tight">
            <span className="block font-serif text-2xl font-bold text-ink">
              {business.shortName}
            </span>
            <span className="block text-[11px] font-bold uppercase tracking-[0.22em] text-stone">
              {labels.brandKicker}
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 xl:flex">
          {navigation.map((item) => {
            const active = activePath === item.href;
            return (
              <Link
                key={item.href}
                href={localizePath(item.href, locale)}
                className={`rounded-full px-4 py-2 text-sm font-bold transition ${
                  active
                    ? "bg-olive text-cream"
                    : "text-stone hover:bg-white hover:text-ink"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <LanguageSwitcher ariaLabel={labels.languageLabel} currentLocale={locale} />
          <button
            type="button"
            aria-label={open ? labels.closeMenu : labels.openMenu}
            onClick={() => setOpen((value) => !value)}
            className="grid h-11 w-11 place-items-center rounded-full border border-ink/10 bg-white text-ink shadow-sm transition hover:border-honey hover:text-terracotta xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="border-t border-ink/10 bg-cream px-4 pb-5 xl:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
          >
            <div className="mx-auto grid max-w-7xl gap-2 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={localizePath(item.href, locale)}
                  onClick={() => setOpen(false)}
                  className={`rounded-2xl px-4 py-3 text-base font-bold transition ${
                    activePath === item.href
                      ? "bg-olive text-cream"
                      : "bg-white text-stone hover:text-ink"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
