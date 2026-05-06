import Link from "next/link";
import { business, navigation } from "@/data/site";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-8">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-honey text-lg font-black text-ink">
              DS
            </span>
            <span>
              <span className="block font-serif text-3xl font-bold">
                {business.shortName}
              </span>
              <span className="text-xs font-bold uppercase tracking-[0.24em] text-cream/60">
                Padaria e Café
              </span>
            </span>
          </div>
          <p className="max-w-sm leading-7 text-cream/72">{business.tagline}</p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-honey">
            Páginas
          </h3>
          <ul className="grid gap-2">
            {navigation.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/72 transition hover:text-honey"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-extrabold uppercase tracking-[0.22em] text-honey">
            Contactos
          </h3>
          <div className="space-y-3 text-cream/72">
            <p>{business.email}</p>
            <p>{business.phone}</p>
            <p>{business.hours}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
