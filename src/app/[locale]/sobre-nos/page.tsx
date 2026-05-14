import Image from "next/image";
import type { Metadata } from "next";
import { HeartHandshake, Sparkles, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

const icons: Record<string, LucideIcon> = {
  heart: HeartHandshake,
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
    title: dictionary.pages.about.metadata.title,
    description: dictionary.pages.about.metadata.description,
    alternates: getLocalizedAlternates("/sobre-nos", locale),
  };
}

export default async function SobreNosPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.about;

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image={images.counter}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow={page.identity.eyebrow}
              title={page.identity.title}
              text={page.identity.text}
            />
            <p className="mt-6 leading-8 text-stone">{page.identity.body}</p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src={images.bread}
              alt={page.identity.imageAlt}
              width={1200}
              height={900}
              className="aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-flour px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {page.values.map((item) => {
            const Icon = icons[item.iconKey] ?? Sparkles;
            return (
              <article
                key={item.title}
                className="rounded-[1.75rem] border border-ink/10 bg-white p-7 shadow-[0_20px_60px_rgba(33,25,20,0.08)]"
              >
                <Icon className="mb-6 h-8 w-8 text-terracotta" />
                <h2 className="font-serif text-4xl font-bold text-ink">
                  {item.title}
                </h2>
                <p className="mt-4 leading-7 text-stone">{item.text}</p>
              </article>
            );
          })}
        </div>
      </MotionSection>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle
            align="center"
            eyebrow={page.space.eyebrow}
            title={page.space.title}
            text={page.space.text}
          />
          <div className="mt-8 flex justify-center">
            <Button href="/galeria" variant="secondary">
              {page.space.cta}
            </Button>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
