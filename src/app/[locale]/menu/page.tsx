import Image from "next/image";
import type { Metadata } from "next";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import { getImagePublicUrl, getPublicMenu } from "@/lib/menu/server";
import { getLocalizedDescription, getLocalizedName } from "@/lib/menu/localize";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.pages.menu.metadata.title,
    description: dictionary.pages.menu.metadata.description,
    alternates: getLocalizedAlternates("/menu", locale),
  };
}

export default async function MenuPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.menu;

  let groups = [] as Awaited<ReturnType<typeof getPublicMenu>>;
  let errorMessage: string | null = null;

  try {
    groups = await getPublicMenu(locale);
  } catch {
    errorMessage =
      locale === "en"
        ? "Unable to load menu now. Please check Firestore permissions and try again."
        : "Nao foi possivel carregar o menu agora. Verifique as permissoes do Firestore e tente novamente.";
  }

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image={images.pastry}
      />

      <MotionSection className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow={page.section.eyebrow}
            title={page.section.title}
            text={page.section.text}
          />

          {errorMessage ? (
            <p className="mt-8 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {errorMessage}
            </p>
          ) : null}

          {!errorMessage && groups.length === 0 ? (
            <p className="mt-8 rounded-2xl border border-ink/10 bg-white px-4 py-3 text-sm text-stone">
              {locale === "en"
                ? "No menu data available yet."
                : "Ainda nao existem dados de menu disponiveis."}
            </p>
          ) : null}

          <div className="mt-10 space-y-8">
            {groups.map((group) => (
              <section key={group.key} className="space-y-4 rounded-3xl border border-ink/10 bg-white p-5 sm:p-6">
                <h2 className="font-serif text-3xl font-bold text-ink">{group.title}</h2>

                <div className="grid gap-4 md:grid-cols-2">
                  {group.items.map((item) => {
                    const imageUrl = getImagePublicUrl(item.imagem_path);
                    const localizedName = getLocalizedName(item, locale);
                    const localizedDescription = getLocalizedDescription(item, locale);

                    return (
                      <article
                        key={item.id}
                        className="overflow-hidden rounded-2xl border border-ink/10 bg-cream/60 transition hover:-translate-y-0.5 hover:shadow-md"
                      >
                        {group.hasAnyImage ? (
                          <div className="relative h-44 w-full border-b border-ink/10 bg-flour">
                            {imageUrl ? (
                              <Image
                                src={imageUrl}
                                alt={localizedName}
                                fill
                                className="object-cover"
                                sizes="(min-width: 768px) 50vw, 100vw"
                              />
                            ) : (
                              <div className="flex h-full w-full items-center justify-center text-sm font-semibold text-stone">
                                Sem imagem
                              </div>
                            )}
                          </div>
                        ) : null}

                        <div className="space-y-2 p-4">
                          <div className="flex items-start justify-between gap-3">
                            <h3 className="text-lg font-semibold text-ink">{localizedName}</h3>
                            {item.preco !== null ? (
                              <span className="rounded-full border border-olive/20 bg-olive/10 px-2.5 py-1 text-xs font-bold text-olive">
                                {`${item.preco.toFixed(2)} EUR`}
                              </span>
                            ) : null}
                          </div>

                          <p className="text-sm text-stone">
                            {localizedDescription || (locale === "en" ? "No description." : "Sem descricao.")}
                          </p>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
