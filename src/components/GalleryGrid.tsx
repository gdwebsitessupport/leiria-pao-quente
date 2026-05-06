"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { gallery } from "@/data/site";

export function GalleryGrid() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {gallery.map((item, index) => (
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
          <div
            className={
              index === 0
                ? "relative aspect-[4/5] lg:aspect-auto lg:min-h-[520px]"
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
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/88 to-transparent p-5 pt-16 font-serif text-2xl font-bold text-white">
            {item.title}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  );
}
