import Image from "next/image";
import { MotionSection } from "@/components/MotionSection";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  text: string;
  image: string;
};

export function PageHero({ eyebrow, title, text, image }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-olive text-cream">
      <div className="absolute inset-0">
        <Image
          src={image}
          alt=""
          fill
          className="object-cover opacity-[0.34]"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-ink/42" />
      </div>
      <MotionSection className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
        <p className="mb-4 text-xs font-extrabold uppercase tracking-[0.3em] text-honey">
          {eyebrow}
        </p>
        <h1 className="max-w-4xl font-serif text-5xl font-bold leading-[0.94] text-balance md:text-7xl">
          {title}
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/86">{text}</p>
      </MotionSection>
    </section>
  );
}
