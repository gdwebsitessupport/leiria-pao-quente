"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { defaultLocale, isLocale, localizePath } from "@/i18n/routing";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  iconName?: "arrow" | "map" | "sparkles";
};

const icons = {
  arrow: ArrowRight,
  map: MapPin,
  sparkles: Sparkles,
};

const variants = {
  primary:
    "bg-olive text-cream shadow-[0_18px_40px_rgba(0,166,180,0.24)] hover:bg-ink",
  secondary:
    "border border-olive/20 bg-cream text-olive hover:border-honey hover:bg-white",
  light:
    "border border-white/30 bg-white/12 text-white backdrop-blur hover:bg-white hover:text-olive",
};

export function Button({
  href,
  children,
  variant = "primary",
  iconName = "arrow",
}: ButtonProps) {
  const Icon = icons[iconName];
  const params = useParams<{ locale?: string }>();
  const locale = params.locale && isLocale(params.locale) ? params.locale : defaultLocale;

  return (
    <motion.div whileHover={{ y: -2, scale: 1.01 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={localizePath(href, locale)}
        className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.14em] transition ${variants[variant]}`}
      >
        <span>{children}</span>
        <Icon className="h-4 w-4" aria-hidden="true" />
      </Link>
    </motion.div>
  );
}
