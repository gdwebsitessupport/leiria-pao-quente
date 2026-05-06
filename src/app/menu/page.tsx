import { MenuCategory } from "@/components/MenuCategory";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images, menuCategories } from "@/data/site";

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Menu e Especialidades"
        title="Pão, pastelaria e escolhas simples para todos os dias."
        text="Uma seleção pensada para pequeno-almoço, lanche, café e refeições práticas."
        image={images.pastry}
      />

      <MotionSection className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Carta exemplo"
            title="Especialidades da casa"
            text="Os valores apresentados são exemplos e podem ser ajustados conforme disponibilidade, época e encomendas."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-3">
            {menuCategories.map((category) => (
              <MenuCategory
                key={category.title}
                title={category.title}
                items={category.items}
              />
            ))}
          </div>
        </div>
      </MotionSection>
    </>
  );
}
