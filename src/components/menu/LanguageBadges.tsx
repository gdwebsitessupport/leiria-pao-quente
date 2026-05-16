import { getEnCompletenessBadge, getPtCompletenessBadge } from "@/lib/menu/completeness";
import { LanguageFlag } from "@/components/menu/LanguageFlag";

type LanguageBadgesProps = {
  nome_pt: string | null | undefined;
  nome_en: string | null | undefined;
};

function badgeClass(complete: boolean): string {
  return complete
    ? "border-emerald-200 bg-emerald-50 text-emerald-800"
    : "border-amber-200 bg-amber-50 text-amber-800";
}

export function LanguageBadges({ nome_pt, nome_en }: LanguageBadgesProps) {
  const ptComplete = getPtCompletenessBadge(nome_pt) === "PT completo";
  const enComplete = getEnCompletenessBadge(nome_en) === "EN completo";

  return (
    <>
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${badgeClass(ptComplete)}`}
        aria-label={`Portugues ${ptComplete ? "completo" : "em falta"}`}
      >
        <LanguageFlag locale="pt" />
        <span>{ptComplete ? "completo" : "em falta"}</span>
      </span>
      <span
        className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs font-semibold ${badgeClass(enComplete)}`}
        aria-label={`English ${enComplete ? "complete" : "missing"}`}
      >
        <LanguageFlag locale="en" />
        <span>{enComplete ? "completo" : "em falta"}</span>
      </span>
    </>
  );
}
