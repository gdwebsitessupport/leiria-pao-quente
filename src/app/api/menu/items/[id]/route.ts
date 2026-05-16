import { errorJson, okJson } from "@/lib/api";
import { deleteMenuItem, toSafeError, updateMenuItem } from "@/lib/menu/server";
import { parseMenuItemFormData } from "@/lib/menu/form-data";
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
    const formData = await request.formData();
    const parsed = parseMenuItemFormData(formData);

    const result = await updateMenuItem(id, parsed.input, parsed.imageFile, parsed.removeImage);
    revalidateMenuPages();

    return okJson(result);
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}

export async function DELETE(_request: Request, context: Context) {
  try {
    await requireAdminSession();
    const { id } = await context.params;

    await deleteMenuItem(id);
    revalidateMenuPages();

    return okJson({ ok: true });
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
