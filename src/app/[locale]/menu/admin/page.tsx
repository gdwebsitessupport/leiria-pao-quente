import { redirect } from "next/navigation";
import { MenuAdminClient } from "@/components/menu/MenuAdminClient";
import { getValidLocale } from "@/i18n/dictionaries";
import { localizeHref } from "@/lib/routes";
import { getAdminMenuData } from "@/lib/menu/server";
import { requireAdminSession } from "@/lib/session";

type MenuAdminPageProps = {
  params: Promise<{ locale: string }>;
};

export const dynamic = "force-dynamic";

export default async function MenuAdminPage({ params }: MenuAdminPageProps) {
  const { locale: localeParam } = await params;
  const locale = getValidLocale(localeParam);

  try {
    await requireAdminSession();
  } catch {
    const nextPath = encodeURIComponent(localizeHref("/menu/admin", locale));
    redirect(`${localizeHref("/login", locale)}?next=${nextPath}`);
  }

  const data = await getAdminMenuData();

  return <MenuAdminClient initialData={data} locale={locale} />;
}
