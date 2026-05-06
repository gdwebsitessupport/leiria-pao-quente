import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { TeamCard } from "@/components/TeamCard";
import { images, team } from "@/data/site";

export default function EquipaPage() {
  return (
    <>
      <PageHero
        eyebrow="Equipa"
        title="Pessoas que recebem, preparam e cuidam."
        text="Uma equipa próxima, experiente e atenta aos detalhes que fazem uma padaria sentir-se familiar."
        image={images.bread}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Rosto da casa"
            title="Experiencia artesanal com trato humano."
            text="Funcoes ficticias para apresentacao inicial do website, prontas a adaptar aos nomes reais."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {team.map((member) => (
              <TeamCard key={member.name} member={member} />
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
