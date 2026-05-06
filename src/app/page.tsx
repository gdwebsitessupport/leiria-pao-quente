import Image from "next/image";
import { Coffee, MapPin, Sparkles, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { MotionSection } from "@/components/MotionSection";
import { ProductCard } from "@/components/ProductCard";
import { SectionTitle } from "@/components/SectionTitle";
import { business, featuredProducts, highlights, images } from "@/data/site";

const visitDetails: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  { title: "Localizacao", text: business.location, icon: MapPin },
  { title: "Frescura", text: "Produtos preparados para o dia", icon: Wheat },
  { title: "Cafetaria", text: "Café, galão e pequenos-almoços", icon: Coffee },
  { title: "Cuidado", text: "Atendimento próximo e simpático", icon: Sparkles },
];

export default function Home() {
  return (
    <>
      <section className="grain-overlay relative min-h-[calc(100vh-5rem)] overflow-hidden bg-ink text-cream">
        <Image
          src={images.hero}
          alt="Pão fresco em tábuas de madeira"
          fill
          priority
          className="object-cover opacity-72"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(33,25,20,0.86),rgba(33,25,20,0.42),rgba(33,25,20,0.22))]" />

        <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
          <MotionSection className="max-w-3xl">
            <p className="mb-5 inline-flex rounded-full border border-white/25 bg-white/10 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-honey backdrop-blur">
              Padaria e café em Pataias
            </p>
            <h1 className="font-serif text-5xl font-bold leading-[0.92] text-balance md:text-7xl lg:text-8xl">
              Pão fresco para os dias simples que sabem melhor.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-cream/86 md:text-xl">
              Na Avenida Rainha Santa Isabel, o {business.name} junta fornadas
              do dia, pastelaria, café e refeições simples num ambiente
              acolhedor e familiar.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button href="#especialidades" variant="light" iconName="sparkles">
                Ver Especialidades
              </Button>
              <Button href="/contactos" variant="primary" iconName="map">
                Contactar
              </Button>
            </div>
          </MotionSection>
        </div>
      </section>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;
            return (
              <article
                key={item.title}
                className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_18px_45px_rgba(33,25,20,0.07)] transition duration-300 hover:-translate-y-1 hover:border-honey/60"
              >
                <Icon className="mb-5 h-7 w-7 text-terracotta" />
                <h2 className="font-serif text-3xl font-bold text-ink">{item.title}</h2>
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
              eyebrow="Especialidades"
              title="Da fornada para a mesa, sem pressa."
              text="Algumas escolhas que fazem parte da rotina: pão, croissants, bolos e café bem tirado."
            />
            <Button href="/menu" variant="secondary">
              Ver Menu
            </Button>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {featuredProducts.map(({ name, category, description, price, image }) => (
              <ProductCard
                key={name}
                product={{ name, category, description, price, image }}
              />
            ))}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[0.92fr_1.08fr]">
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src={images.counter}
              alt="Montra de pastelaria e ambiente de café"
              width={1200}
              height={900}
              className="aspect-[4/3] object-cover"
            />
          </div>
          <div>
            <SectionTitle
              eyebrow="Ponto de encontro"
              title="Um balcão com cheiro a café e caras conhecidas."
              text="Para quem vive em Pataias, e uma paragem diaria. Para quem visita, e uma forma simples de provar uma padaria portuguesa de bairro."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {visitDetails.map(({ title, text, icon: Icon }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-ink/10 bg-white p-5"
                >
                  <Icon className="mb-4 h-5 w-5 text-terracotta" />
                  <h3 className="font-bold text-ink">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-olive px-4 py-18 text-cream sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-7 md:flex-row md:items-center">
          <div>
            <p className="mb-3 text-xs font-extrabold uppercase tracking-[0.28em] text-honey">
              Visite-nos
            </p>
            <h2 className="max-w-3xl font-serif text-4xl font-bold leading-none md:text-6xl">
              Passe pela Avenida Rainha Santa Isabel.
            </h2>
          </div>
          <Button href="/contactos" variant="light" iconName="map">
            Ver Contactos
          </Button>
        </div>
      </MotionSection>
    </>
  );
}
