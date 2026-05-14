"use client";

import { motion } from "framer-motion";
import { CakeSlice, Coffee, Croissant, Wheat } from "lucide-react";
import Image from "next/image";

const icons = {
  cake: CakeSlice,
  coffee: Coffee,
  croissant: Croissant,
  wheat: Wheat,
};

type ProductCardProps = {
  product: {
    name: string;
    category: string;
    description: string;
    price: string;
    image: string;
    iconKey: string;
  };
};

export function ProductCard({ product }: ProductCardProps) {
  const Icon = icons[product.iconKey as keyof typeof icons] ?? Wheat;

  return (
    <motion.article
      className="group overflow-hidden rounded-[2rem] border border-ink/10 bg-white shadow-[0_24px_70px_rgba(33,25,20,0.09)]"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, 100vw"
        />
        <div className="absolute left-4 top-4 rounded-full bg-cream/92 px-3 py-2 text-xs font-extrabold uppercase tracking-[0.18em] text-olive">
          {product.category}
        </div>
      </div>
      <div className="p-6">
        <div className="mb-4 flex items-center justify-between gap-4">
          <Icon className="h-6 w-6 text-terracotta" />
          <span className="font-serif text-2xl font-bold text-olive">
            {product.price}
          </span>
        </div>
        <h3 className="font-serif text-3xl font-bold text-ink">{product.name}</h3>
        <p className="mt-3 leading-7 text-stone">{product.description}</p>
      </div>
    </motion.article>
  );
}
