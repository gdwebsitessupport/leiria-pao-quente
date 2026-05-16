import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { BackToTopButton } from "@/components/BackToTopButton";
import { getDictionary, getValidLocale } from "@/i18n/dictionaries";
import { getLocalizedAlternates } from "@/i18n/metadata";
import { localeConfig, locales } from "@/i18n/routing";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

type LocaleLayoutProps = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

type LocaleMetadataProps = {
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocaleMetadataProps): Promise<Metadata> {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return {
    title: {
      default: dictionary.metadata.title,
      template: dictionary.metadata.titleTemplate,
    },
    description: dictionary.metadata.description,
    alternates: getLocalizedAlternates("/", locale),
  };
}

export default async function RootLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const dictionary = await getDictionary(locale);

  return (
    <html
      lang={localeConfig[locale].htmlLang}
      suppressHydrationWarning
      className={`${manrope.variable} ${cormorant.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="flex min-h-full flex-col">
        <Navbar
          business={dictionary.business}
          labels={dictionary.shell}
          locale={locale}
          navigation={dictionary.navigation}
        />
        <main className="flex-1">{children}</main>
        <Footer
          business={dictionary.business}
          labels={dictionary.shell}
          locale={locale}
          navigation={dictionary.navigation}
        />
        <BackToTopButton
          ariaLabel={dictionary.shell.backToTopAriaLabel}
          label={dictionary.shell.backToTopLabel}
        />
      </body>
    </html>
  );
}
