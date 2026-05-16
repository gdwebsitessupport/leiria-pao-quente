import { errorJson, okJson } from "@/lib/api";
import type { CategoryInput } from "@/lib/menu/server";
import { createCategory, toSafeError } from "@/lib/menu/server";
import { revalidateMenuPages } from "@/lib/menu/revalidate";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    await requireAdminSession();
    const body = (await request.json()) as CategoryInput;

    const category = await createCategory(body);
    revalidateMenuPages();

    return okJson({ category }, 201);
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
