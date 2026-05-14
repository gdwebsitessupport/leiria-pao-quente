"use client";

import { motion } from "framer-motion";
import {
  CakeSlice,
  Coffee,
  Croissant,
  CupSoda,
  Home,
  Sandwich,
  Soup,
  Sparkles,
  Wheat,
} from "lucide-react";

const icons = {
  cake: CakeSlice,
  coffee: Coffee,
  croissant: Croissant,
  cup: CupSoda,
  home: Home,
  sandwich: Sandwich,
  soup: Soup,
  sparkles: Sparkles,
  wheat: Wheat,
};

type MenuCategoryProps = {
  iconKey: string;
  title: string;
  items: string[][];
};

export function MenuCategory({ iconKey, title, items }: MenuCategoryProps) {
  const Icon = icons[iconKey as keyof typeof icons] ?? Wheat;

  return (
    <motion.article
      className="rounded-[1.75rem] border border-ink/10 bg-white p-5 shadow-[0_20px_60px_rgba(16,42,47,0.08)] md:p-6"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55 }}
      whileHover={{ y: -5 }}
    >
      <div className="mb-5 flex items-center gap-3 border-b border-ink/10 pb-4">
        <span className="grid h-11 w-11 place-items-center rounded-full bg-flour text-terracotta">
          <Icon className="h-5 w-5" />
        </span>
        <h2 className="font-serif text-3xl font-bold text-ink">{title}</h2>
      </div>
      <div className="space-y-5">
        {items.map(([name, description, price]) => (
          <div key={name} className="grid gap-2">
            <div className="flex items-baseline justify-between gap-4">
              <h3 className="font-bold text-ink">{name}</h3>
              <span className="shrink-0 font-serif text-xl font-bold text-olive">
                {price}
              </span>
            </div>
            <p className="text-sm leading-6 text-stone">{description}</p>
          </div>
        ))}
      </div>
    </motion.article>
  );
}
