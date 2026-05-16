import type { LocaleCode, MenuItemRecord } from "@/lib/menu/types";

export function getLocalizedName(item: Pick<MenuItemRecord, "nome_pt" | "nome_en">, locale: LocaleCode): string {
  if (locale === "en") {
    return item.nome_en?.trim() || item.nome_pt;
  }

  return item.nome_pt;
}

export function getLocalizedDescription(
  item: Pick<MenuItemRecord, "descricao_pt" | "descricao_en">,
  locale: LocaleCode,
): string | null {
  if (locale === "en") {
    return item.descricao_en?.trim() || item.descricao_pt?.trim() || null;
  }

  return item.descricao_pt?.trim() || null;
}
