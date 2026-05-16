import "server-only";

import { revalidatePath } from "next/cache";
import { locales } from "@/i18n/routing";
import { localizeHref } from "@/lib/routes";

export function revalidateMenuPages(): void {
  for (const locale of locales) {
    revalidatePath(localizeHref("/menu", locale));
    revalidatePath(localizeHref("/menu/admin", locale));
  }
}
