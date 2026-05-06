import { MotionSection } from "@/components/MotionSection";
import { PageHero } from "@/components/PageHero";
import { business, images, openingHours } from "@/data/site";
import { Clock, Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react";

const phoneHref = `tel:${business.phone.replace(/\s/g, "")}`;
const whatsappHref = `https://wa.me/${business.phone.replace(/\D/g, "")}`;
const directionsHref =
  "https://www.google.com/maps/search/?api=1&query=Av.%20Rainha%20Santa%20Isabel%20113%2C%20Pataias";

const contactActions = [
  { label: "Direções", href: directionsHref, icon: Navigation },
  { label: "Email", href: `mailto:${business.email}`, icon: Mail },
  { label: "WhatsApp", href: whatsappHref, icon: MessageCircle },
  { label: "Ligue agora", href: phoneHref, icon: Phone },
];

export default function ContactosPage() {
  return (
    <>
      <PageHero
        eyebrow="Contactos"
        title="Estamos em Pataias, prontos para o café e a fornada do dia."
        text="A morada, o telefone e o horário ficam aqui em texto simples, sem mapa incorporado."
        image={images.counter}
      />

      <MotionSection className="bg-flour px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <article className="rounded-[2rem] bg-ink p-8 text-cream shadow-[0_24px_70px_rgba(33,25,20,0.18)] sm:p-10 lg:p-12">
            <p className="inline-flex items-center gap-2 rounded-full border border-honey/40 bg-white/8 px-4 py-2 text-xs font-extrabold uppercase tracking-[0.22em] text-honey">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Localização
            </p>
            <h2 className="mt-8 max-w-md font-serif text-4xl font-bold leading-tight text-balance md:text-5xl">
              Encontra-nos no coração de Pataias.
            </h2>
            <address className="mt-7 not-italic">
              <a
                href={directionsHref}
                target="_blank"
                rel="noreferrer"
                className="font-bold text-cream/76 transition hover:text-honey"
              >
                {business.location}
              </a>
              <a
                href={phoneHref}
                className="mt-5 block font-bold text-cream/76 transition hover:text-honey"
              >
                {business.phone}
              </a>
            </address>
            <div className="mt-8 grid gap-3 sm:max-w-80">
              {contactActions.map((action) => {
                const Icon = action.icon;

                return (
                  <a
                    key={action.label}
                    href={action.href}
                    target={action.href.startsWith("http") ? "_blank" : undefined}
                    rel={action.href.startsWith("http") ? "noreferrer" : undefined}
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
              Horário
            </p>
            <h2 className="mt-6 font-serif text-4xl font-bold leading-tight text-ink text-balance md:text-5xl">
              Aberto para café, pão quente e pastelaria.
            </h2>
            <dl className="mt-8 grid gap-2.5">
              {openingHours.map((item) => (
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
      </MotionSection>
    </>
  );
}
