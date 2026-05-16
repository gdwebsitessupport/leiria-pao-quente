import { errorJson, okJson } from "@/lib/api";
import { reorderCategories, toSafeError } from "@/lib/menu/server";
import { revalidateMenuPages } from "@/lib/menu/revalidate";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = (await request.json()) as { orderedIds?: unknown };
    const orderedIds = Array.isArray(body.orderedIds)
      ? body.orderedIds.filter((id): id is string => typeof id === "string")
      : [];

    const categories = await reorderCategories(orderedIds);
    revalidateMenuPages();

    return okJson({ categories });
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
