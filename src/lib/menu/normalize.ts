import type { CategoryRecord, MenuItemRecord } from "@/lib/menu/types";

export function nullableTrimmed(value: unknown): string | null {
  if (typeof value !== "string") {
    return null;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
}

export function requiredTrimmed(value: unknown, message: string): string {
  const normalized = nullableTrimmed(value);
  if (!normalized) {
    throw new Error(message);
  }

  return normalized;
}

export function nullableNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value === "string") {
    const normalized = value.trim();
    if (!normalized) {
      return null;
    }

    const parsed = Number(normalized.replace(",", "."));
    if (!Number.isFinite(parsed)) {
      return null;
    }

    return parsed;
  }

  return null;
}

export function normalizeBoolean(value: unknown, defaultValue = false): boolean {
  if (typeof value === "boolean") {
    return value;
  }

  return defaultValue;
}

export function normalizeTimestamp(value: unknown): string | null {
  if (!value) {
    return null;
  }

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "object" &&
    value !== null &&
    "toDate" in value &&
    typeof (value as { toDate: () => Date }).toDate === "function"
  ) {
    return (value as { toDate: () => Date }).toDate().toISOString();
  }

  return null;
}

export function sortCategories(items: CategoryRecord[]): CategoryRecord[] {
  return [...items].sort((a, b) => {
    const aOrder = a.ordem;
    const bOrder = b.ordem;

    if (aOrder === null && bOrder !== null) {
      return 1;
    }

    if (aOrder !== null && bOrder === null) {
      return -1;
    }

    if (aOrder !== null && bOrder !== null && aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    return a.nome_pt.localeCompare(b.nome_pt, "pt");
  });
}

export function sortMenuItems(items: MenuItemRecord[]): MenuItemRecord[] {
  return [...items].sort((a, b) => {
    const aOrder = a.ordem;
    const bOrder = b.ordem;

    if (aOrder === null && bOrder !== null) {
      return 1;
    }

    if (aOrder !== null && bOrder === null) {
      return -1;
    }

    if (aOrder !== null && bOrder !== null && aOrder !== bOrder) {
      return aOrder - bOrder;
    }

    const aDate = a.created_at ? Date.parse(a.created_at) : 0;
    const bDate = b.created_at ? Date.parse(b.created_at) : 0;

    return bDate - aDate;
  });
}
