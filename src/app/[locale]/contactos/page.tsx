import type { Metadata } from "next";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { businessAddress, directionsHref, googleMapsEmbedHref, images } from "@/data/site";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";

type LocalePageProps = {
  params: Promise<{ locale: string }>;
};

const icons: Record<string, LucideIcon> = {
  mail: Mail,
  message: MessageCircle,
  navigation: Navigation,
  phone: Phone,
};

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.pages.contacts.metadata.title,
    description: dictionary.pages.contacts.metadata.description,
    alternates: getLocalizedAlternates("/contactos", locale),
  };
}

export default async function ContactosPage({ params }: LocalePageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);
  const page = dictionary.pages.contacts;
  const phoneHref = `tel:${dictionary.business.phone.replace(/\s/g, "")}`;
  const whatsappHref = `https://wa.me/${dictionary.business.phone.replace(/\D/g, "")}`;
  const actionHrefs = [
    directionsHref,
    `mailto:${dictionary.business.email}`,
    whatsappHref,
    phoneHref,
  ];

  return (
    <>
      <PageHero
        eyebrow={page.hero.eyebrow}
        title={page.hero.title}
        text={page.hero.text}
        image={images.counter}
      />

      <MotionSection className="bg-flour px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] bg-ink p-8 text-cream shadow-[0_24px_70px_rgba(33,25,20,0.18)] sm:p-10 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-honey/40 bg-white/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-honey">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {page.location.eyebrow}
            </p>
            <h2 className="mt-8 max-w-md font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">
              {page.location.title}
            </h2>
            <address className="mt-7 not-italic">
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-cream/76 transition hover:text-honey"
              >
                {dictionary.business.location}
              </a>
              <a
                href={phoneHref}
                className="mt-5 block font-bold text-cream/76 transition hover:text-honey"
              >
                {dictionary.business.phone}
              </a>
            </address>
            <div className="mt-8 grid gap-3 sm:max-w-80">
              {page.actions.map((action, index) => {
                const Icon = icons[action.iconKey] ?? Navigation;
                const href = actionHrefs[index];

                return (
                  <a
                    key={action.label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                    className="inline-flex min-h-12 items-center justify-center gap-3 rounded-full border border-honey/55 bg-white/10 px-5 py-3 text-sm font-extrabold uppercase tracking-[0.16em] text-honey transition hover:bg-honey hover:text-ink"
                  >
                    <Icon className="h-4 w-4" aria-hidden="true" />
                    {action.label}
                  </a>
                );
              })}
            </div>
          </article>

          <article className="rounded-[2rem] border border-honey/35 bg-cream p-8 shadow-[0_24px_70px_rgba(33,25,20,0.08)] sm:p-10 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-honey/35 bg-white/50 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-caramel">
              <Clock className="h-4 w-4" aria-hidden="true" />
              {page.schedule.eyebrow}
            </p>
            <h2 className="mt-6 font-serif text-4xl font-bold leading-tight text-ink text-balance md:text-5xl">
              {page.schedule.title}
            </h2>
            <dl className="mt-8 grid gap-2.5">
              {dictionary.openingHours.map((item) => (
                <div
                  key={item.day}
                  className="grid min-h-11 grid-cols-[minmax(0,1fr)_auto] items-center gap-4 rounded-xl border border-honey/35 bg-white/72 px-4 py-3"
                >
                  <dt className="font-bold text-ink">{item.day}</dt>
                  <dd className="font-extrabold text-caramel">{item.hours}</dd>
                </div>
              ))}
            </dl>
          </article>
          </div>

          <article className="overflow-hidden rounded-[2rem] border border-honey/35 bg-cream shadow-[0_24px_70px_rgba(33,25,20,0.08)]">
            <div className="border-b border-honey/35 px-8 py-6 sm:px-10">
              <h2 className="font-serif text-3xl font-bold leading-tight text-ink text-balance md:text-4xl">
                Google Maps
              </h2>
              <p className="mt-2 text-sm font-medium text-caramel/90">
                {dictionary.business.location}
              </p>
            </div>
            <div className="relative h-0 w-full pb-[62%] sm:pb-[50%] lg:pb-[42%]">
              <iframe
                title={`Google Maps - ${businessAddress}`}
                src={googleMapsEmbedHref}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen
              />
            </div>
            <div className="px-8 py-5 sm:px-10">
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-honey/55 bg-white px-5 py-2 text-sm font-extrabold uppercase tracking-[0.16em] text-caramel transition hover:bg-honey hover:text-ink"
              >
                {page.actions[0]?.label ?? "Google Maps"}
              </a>
            </div>
          </article>
        </div>
      </MotionSection>
    </>
  );
}
