"use client";

import Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

type LenisWindow = Window & {
  __lenis?: Lenis;
};

export function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      autoRaf: true,
      autoResize: true,
    });

    lenisRef.current = lenis;
    (window as LenisWindow).__lenis = lenis;

    const syncSize = () => {
      lenis.resize();
    };

    window.addEventListener("load", syncSize);
    window.addEventListener("resize", syncSize);

    const observer = new MutationObserver(() => {
      lenis.resize();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
      window.removeEventListener("load", syncSize);
      window.removeEventListener("resize", syncSize);
      delete (window as LenisWindow).__lenis;
      lenisRef.current = null;
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const id = window.setTimeout(() => {
      lenisRef.current?.resize();
    }, 0);

    return () => {
      window.clearTimeout(id);
    };
  }, [pathname]);

  return null;
}
