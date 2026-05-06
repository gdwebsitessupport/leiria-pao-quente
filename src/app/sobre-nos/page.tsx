import Image from "next/image";
import { HeartHandshake, Sparkles, Wheat } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/Button";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";

const values: {
  title: string;
  text: string;
  icon: LucideIcon;
}[] = [
  {
    title: "Missão",
    text: "Fazer pão e pastelaria com qualidade, servir bem e receber com simpatia.",
    icon: Wheat,
  },
  {
    title: "Comunidade",
    text: "Ser um ponto de encontro simples para quem vive e trabalha em Pataias.",
    icon: HeartHandshake,
  },
  {
    title: "Ambiente",
    text: "Um espaço quente, prático e familiar, pensado para entrar sem cerimónia.",
    icon: Sparkles,
  },
];

export default function SobreNosPage() {
  return (
    <>
      <PageHero
        eyebrow="Sobre Nós"
        title="Uma padaria local feita de rotina, cuidado e simpatia."
        text="O Pão Quente Duarte Silva nasceu para servir Pataias com produtos frescos e um atendimento próximo."
        image={images.counter}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Identidade"
              title="O sabor de uma casa onde se entra todos os dias."
              text="Aqui faz-se pão, serve-se café e prepara-se pastelaria com a mesma ideia simples: qualidade, frescura e um sorriso ao balcão."
            />
            <p className="mt-6 leading-8 text-stone">
              A ligacao a comunidade esta nos pequenos gestos: conhecer o pedido
              habitual, guardar uma palavra amiga e manter a montra pronta para
              quem passa antes do trabalho, ao lanche ou ao fim do dia.
            </p>
          </div>
          <div className="relative overflow-hidden rounded-[2rem]">
            <Image
              src={images.bread}
              alt="Pão artesanal numa padaria"
              width={1200}
              height={900}
              className="aspect-[4/3] object-cover"
            />
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-flour px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-3">
          {values.map(({ title, text, icon: Icon }) => (
            <article
              key={title}
              className="rounded-[1.75rem] border border-ink/10 bg-white p-7 shadow-[0_20px_60px_rgba(33,25,20,0.08)]"
            >
              <Icon className="mb-6 h-8 w-8 text-terracotta" />
              <h2 className="font-serif text-4xl font-bold text-ink">{title}</h2>
              <p className="mt-4 leading-7 text-stone">{text}</p>
            </article>
          ))}
        </div>
      </MotionSection>

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <SectionTitle
            align="center"
            eyebrow="O espaço"
            title="Cheiro a forno, café no ar e uma montra que muda com o dia."
            text="Um ambiente acolhedor, refinado sem perder a naturalidade de um negocio local."
          />
          <div className="mt-8 flex justify-center">
            <Button href="/galeria" variant="secondary">
              Ver Galeria
            </Button>
          </div>
        </div>
      </MotionSection>
    </>
  );
}
