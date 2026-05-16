"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, ZoomIn } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryGridProps = {
  items: readonly {
    title: string;
    image: string;
  }[];
  labels: {
    close: string;
    zoom: string;
  };
};

export function GalleryGrid({ items, labels }: GalleryGridProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const selectedItem = selectedIndex === null ? null : items[selectedIndex];

  useEffect(() => {
    if (selectedIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelectedIndex(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedIndex]);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, index) => (
          <motion.figure
            key={item.title}
            className={`group relative overflow-hidden rounded-[1.5rem] bg-ink ${
              index === 0 || index === 7 ? "sm:col-span-2" : ""
            } ${index === 0 ? "lg:row-span-2" : ""}`}
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, delay: (index % 4) * 0.06 }}
            whileHover={{ y: -4 }}
          >
            <button
              type="button"
              aria-label={`${labels.zoom} ${item.title}`}
              onClick={() => setSelectedIndex(index)}
              className="block h-full w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey focus-visible:ring-offset-4 focus-visible:ring-offset-cream"
            >
              <div
                className={
                  index === 0
                    ? "relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px]"
                    : index === 5 || index === 6
                      ? "relative aspect-[4/3] lg:h-full lg:aspect-auto"
                      : "relative aspect-[4/3]"
                }
              >
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover opacity-[0.88] transition duration-700 group-hover:scale-105 group-hover:opacity-100"
                  sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                />
              </div>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-ink/70 text-white opacity-0 backdrop-blur transition group-hover:opacity-100 group-focus-within:opacity-100">
                <ZoomIn className="h-5 w-5" aria-hidden="true" />
              </span>
            </button>
            <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/88 to-transparent p-5 pt-16 font-serif text-2xl font-bold text-white">
              {item.title}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {selectedItem ? (
          <motion.div
            className="fixed inset-0 z-[80] grid place-items-center bg-ink/92 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={selectedItem.title}
              className="relative h-full w-full max-w-6xl"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              onClick={(event) => event.stopPropagation()}
            >
              <button
                type="button"
                aria-label={labels.close}
                onClick={() => setSelectedIndex(null)}
                className="absolute right-0 top-0 z-10 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-lg transition hover:bg-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-honey"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                <Image
                  src={selectedItem.image}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                  sizes="100vw"
                />
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
