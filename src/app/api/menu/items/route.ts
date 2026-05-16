import { errorJson, okJson } from "@/lib/api";
import { createMenuItem, toSafeError } from "@/lib/menu/server";
import { parseMenuItemFormData } from "@/lib/menu/form-data";
import { revalidateMenuPages } from "@/lib/menu/revalidate";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const formData = await request.formData();
    const parsed = parseMenuItemFormData(formData);

    const result = await createMenuItem(parsed.input, parsed.imageFile);
    revalidateMenuPages();

    return okJson(result, 201);
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
