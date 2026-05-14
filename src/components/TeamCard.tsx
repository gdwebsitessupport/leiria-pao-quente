"use client";

import { motion } from "framer-motion";
import Image from "next/image";

type TeamCardProps = {
  member: {
    name: string;
    role: string;
    experience: string;
    image: string;
  };
};

export function TeamCard({ member }: TeamCardProps) {
  return (
    <motion.article
      className="group overflow-hidden rounded-[1.75rem] border border-ink/10 bg-white shadow-[0_22px_65px_rgba(16,42,47,0.08)]"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.6 }}
      whileHover={{ y: -6 }}
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes="(min-width: 1024px) 20vw, (min-width: 640px) 50vw, 100vw"
        />
      </div>
      <div className="p-5">
        <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-terracotta">
          {member.role}
        </p>
        <h3 className="mt-2 font-serif text-3xl font-bold text-ink">{member.name}</h3>
        <p className="mt-2 text-sm font-semibold text-stone">{member.experience}</p>
      </div>
    </motion.article>
  );
}
