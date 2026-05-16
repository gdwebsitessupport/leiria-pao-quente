import Image from "next/image";
import type { Metadata } from "next";
import { Coffee, HeartHandshake, MapPin, Sparkles, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { MotionSection } from "@/components/MotionSection";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

const icons: Record<string, LucideIcon> = {
  coffee: Coffee,
  heart: HeartHandshake,
  map: MapPin,
  sparkles: Sparkles,
  wheat: Wheat,
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.pages.home.metadata.title,
    description: dictionary.pages.home.metadata.description,
    alternates: getLocalizedAlternates("/", locale),
  };
}

export default async function Home({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.home;

  return (
    <>
      <section className="grain-overlay relative min-h-[calc(100vh-5rem)] overflow-hidden bg-ink text-cream">
        <Image
          src={images.homeHero}
          alt={page.hero.imageAlt}
          fill
          priority
          className="object-cover opacity-72"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,42,47,0.86),rgba(16,42,47,0.42),rgba(16,42,47,0.22))]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <MotionSection className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-honey backdrop-blur">
              {page.hero.eyebrow}
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[0.92] text-balance md:text-7xl lg:text-8xl">
              {page.hero.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/86 md:text-xl">
              {page.hero.text}
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#especialidades" variant="light" iconName="sparkles">
                {page.hero.specialtiesCta}
              </Button>
              <Button href="/contactos" variant="primary" iconName="map">
                {page.hero.contactCta}
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {page.highlights.map((item) => {
            const Icon = icons[item.iconKey] ?? Wheat;
            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_18px_45px_rgba(16,42,47,0.07)] transition duration-300 hover:-translate-y-1 hover:border-honey/60"
              >
                <Icon className="mb-5 h-7 w-7 text-terracotta" />
                <h2 className="font-serif text-3xl font-bold text-ink">
                  {item.title}
                </h2>
                <p className="mt-3 leading-7 text-stone">{item.description}</p>
              </article>
            );
          })}
        </div>
      </MotionSection>

      <MotionSection
        id="especialidades"
        className="bg-flour px-4 py-20 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionTitle
              eyebrow={page.specialties.eyebrow}
              title={page.specialties.title}
              text={page.specialties.text}
            />
            <Button href="/menu" variant="secondary">
              {page.specialties.cta}
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {page.featuredProducts.map((product) => (
              <ProductCard key={product.name} product={product} />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src={images.counter}
              alt={page.meeting.imageAlt}
              width={1200}
              height={900}
              className="aspect-[4/3] object-cover"
            />
          </div>
          <div>
            <SectionTitle
              eyebrow={page.meeting.eyebrow}
              title={page.meeting.title}
              text={page.meeting.text}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {page.meeting.visitDetails.map((item) => {
                const Icon = icons[item.iconKey] ?? Sparkles;
                return (
                  <div
                    key={item.title}
                    className="rounded-3xl border border-ink/10 bg-white p-5"
                  >
                    <Icon className="mb-4 h-5 w-5 text-terracotta" />
                    <h3 className="font-bold text-ink">{item.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-stone">{item.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-olive px-4 py-18 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-honey">
              {page.visit.eyebrow}
            </p>
            <h2 className="max-w-3xl font-serif text-4xl font-bold leading-none md:text-6xl">
              {page.visit.title}
            </h2>
          </div>
          <Button href="/contactos" variant="light" iconName="map">
            {page.visit.cta}
          </Button>
        </div>
      </MotionSection>
    </>
  );
}
