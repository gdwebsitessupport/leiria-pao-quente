import { GalleryGrid } from "@/components/GalleryGrid";
import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { SectionTitle } from "@/components/SectionTitle";
import { images } from "@/data/site";

export default function GaleriaPage() {
  return (
    <>
      <PageHero
        eyebrow="Galeria"
        title="Texturas, vitrines e momentos de padaria."
        text="Imagens placeholder de alta qualidade para representar o espaço, os produtos e o ambiente."
        image={images.coffee}
      />

      <MotionSection className="bg-cream px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Ambiente"
            title="Uma amostra visual do que se encontra ao entrar."
            text="Pão fresco, pastelaria, café, montra e aquele conforto de bairro."
          />
          <div className="mt-12">
            <GalleryGrid />
          </div>
        </div>
      </MotionSection>
    </>
  );
}
