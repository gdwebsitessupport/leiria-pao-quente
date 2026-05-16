import { redirect } from "next/navigation";
import { LoginForm } from "@/components/menu/LoginForm";
import { getValidLocale } from "@/i18n/dictionaries";
import { sanitizeNextPath } from "@/lib/routes";
import { getOptionalAdminSession } from "@/lib/session";

type LoginPageProps = {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ next?: string }>;
};

export const dynamic = "force-dynamic";

export default async function LoginPage({ params, searchParams }: LoginPageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);
  const query = await searchParams;
  const redirectTo = sanitizeNextPath(query.next ?? null, locale);

  const session = await getOptionalAdminSession();
  if (session) {
    redirect(redirectTo);
  }

  return (
    <section className="bg-cream px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md space-y-4">
        <h1 className="font-serif text-4xl font-bold text-ink">Area de administracao</h1>
        <p className="text-sm text-stone">Inicie sessao para gerir o menu publico.</p>
        <LoginForm redirectTo={redirectTo} />
      </div>
    </section>
  );
}
