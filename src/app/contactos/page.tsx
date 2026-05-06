import { Button } from "@/components/Button";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { business, contactDetails, images } from "@/data/site";

export default function ContactosPage() {
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Estamos em Pataias, prontos para o café e a fornada do dia."
        text="A morada, o telefone, o email e o horário ficam aqui em texto simples, sem mapa incorporado."
        image={images.counter}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionTitle
              eyebrow="Visite o espaço"
              title="Uma paragem pratica na Avenida Rainha Santa Isabel."
              text="Para comprar pão, tomar café, escolher um bolo ou fazer uma refeição simples."
            />
            <div className="mt-8">
              <Button href="/menu" variant="secondary">
                Ver Especialidades
              </Button>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactDetails.map((detail) => {
              const Icon = detail.icon;
              return (
                <article
                  key={detail.label}
                  className="rounded-[1.5rem] border border-ink/10 bg-white p-6 shadow-[0_18px_50px_rgba(33,25,20,0.07)]"
                >
                  <Icon className="mb-5 h-7 w-7 text-terracotta" />
                  <h2 className="font-serif text-3xl font-bold text-ink">
                    {detail.label}
                  </h2>
                  <p className="mt-3 leading-7 text-stone">{detail.value}</p>
                </article>
              );
            })}
          </div>
        </div>
      </MotionSection>

      <MotionSection className="bg-flour px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[2rem] border border-ink/10 bg-white p-8 shadow-[0_22px_70px_rgba(33,25,20,0.08)] md:p-10">
          <p className="text-xs font-extrabold uppercase tracking-[0.26em] text-terracotta">
            Nota
          </p>
          <h2 className="mt-3 font-serif text-4xl font-bold text-ink">
            Dados prontos a ajustar antes da publicação.
          </h2>
          <p className="mt-4 max-w-3xl leading-8 text-stone">
            O email e telefone são exemplos. A localização principal indicada é{" "}
            {business.location}.
          </p>
        </div>
      </MotionSection>
    </>
  );
}
