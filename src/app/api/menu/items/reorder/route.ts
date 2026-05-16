import { errorJson, okJson } from "@/lib/api";
import { reorderMenuItems, toSafeError } from "@/lib/menu/server";
import { revalidateMenuPages } from "@/lib/menu/revalidate";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = (await request.json()) as { categoryId?: unknown; orderedIds?: unknown };

    const categoryId = typeof body.categoryId === "string"
      ? body.categoryId
      : body.categoryId === null
        ? null
        : null;

    const orderedIds = Array.isArray(body.orderedIds)
      ? body.orderedIds.filter((id): id is string => typeof id === "string")
      : [];

    const items = await reorderMenuItems(categoryId, orderedIds);
    revalidateMenuPages();

    return okJson({ items });
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
