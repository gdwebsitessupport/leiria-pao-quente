import type { Metadata } from "next";
import { GalleryGrid } from "@/components/GalleryGrid";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.pages.gallery.metadata.title,
    description: dictionary.pages.gallery.metadata.description,
    alternates: getLocalizedAlternates("/galeria", locale),
  };
}

export default async function GaleriaPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.gallery;

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image={images.coffee}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={page.section.eyebrow}
            title={page.section.title}
            text={page.section.text}
          />
          <div className="mt-12">
            <GalleryGrid items={page.items} />
          </div>
        </div>
      </MotionSection>
    </>
  );
}
