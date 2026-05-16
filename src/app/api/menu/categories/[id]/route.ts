import { errorJson, okJson } from "@/lib/api";
import type { CategoryInput } from "@/lib/menu/server";
import { deleteCategory, toSafeError, updateCategory } from "@/lib/menu/server";
import { revalidateMenuPages } from "@/lib/menu/revalidate";
import { requireAdminSession } from "@/lib/session";

type Context = {
  params: Promise<{ id: string }>;
};

export const runtime = "nodejs";

export async function PATCH(request: Request, context: Context) {
  try {
    await requireAdminSession();
    const { id } = await context.params;
    const body = (await request.json()) as CategoryInput;

    const category = await updateCategory(id, body);
    revalidateMenuPages();

    return okJson({ category });
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireAdminSession();
    const { id } = await context.params;

    await deleteCategory(id);
    revalidateMenuPages();

    return okJson({ ok: true });
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
