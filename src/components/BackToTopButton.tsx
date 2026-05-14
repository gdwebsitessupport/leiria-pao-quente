"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

type LenisLike = {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { duration?: number; immediate?: boolean }
  ) => void;
};

declare global {
  interface Window {
    __lenis?: LenisLike;
  }
}

type BackToTopButtonProps = {
  ariaLabel: string;
  label: string;
  className?: string;
  positionClassName?: string;
  showAfter?: number;
};

const defaultButtonClassName =
  "group inline-flex h-12 items-center gap-2 rounded-full border border-olive/20 bg-cream/95 px-4 text-xs font-extrabold uppercase tracking-[0.14em] text-olive shadow-[0_10px_25px_rgba(16,42,47,0.16)] backdrop-blur transition hover:-translate-y-0.5 hover:border-honey hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-2 focus-visible:ring-offset-cream";

const defaultPositionClassName = "bottom-5 right-4 sm:bottom-8 sm:right-6";

export function BackToTopButton({
  ariaLabel,
  label,
  className,
  positionClassName,
  showAfter = 360,
}: BackToTopButtonProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateVisibility = () => {
      setVisible(window.scrollY > showAfter);
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateVisibility);
      }
    };

    updateVisibility();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [showAfter]);

  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0, { duration: 1.05 });
      return;
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`pointer-events-none fixed z-40 ${positionClassName ?? defaultPositionClassName}`}
    >
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={scrollToTop}
        className={`${defaultButtonClassName} ${className ?? ""} ${
          visible ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-3 opacity-0"
        }`}
      >
        <ArrowUp className="h-4 w-4 transition-transform group-hover:-translate-y-0.5" />
        <span className="hidden sm:inline">{label}</span>
      </button>
    </div>
  );
}
