export function hasLocalizedName(value: string | null | undefined): boolean {
  return typeof value === "string" && value.trim().length > 0;
}

export function getPtCompletenessBadge(nome_pt: string | null | undefined): "PT completo" | "PT em falta" {
  return hasLocalizedName(nome_pt) ? "PT completo" : "PT em falta";
}

export function getEnCompletenessBadge(nome_en: string | null | undefined): "EN completo" | "EN em falta" {
  return hasLocalizedName(nome_en) ? "EN completo" : "EN em falta";
}
