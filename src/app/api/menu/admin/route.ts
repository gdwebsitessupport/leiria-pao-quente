import { errorJson, okJson } from "@/lib/api";
import { getAdminMenuData, toSafeError } from "@/lib/menu/server";
import { requireAdminSession } from "@/lib/session";

export const runtime = "nodejs";

export async function GET() {
  try {
    await requireAdminSession();
    const data = await getAdminMenuData();
    return okJson(data);
  } catch (error) {
    const safeError = toSafeError(error);
    return errorJson(safeError.message, safeError.status, safeError.code);
  }
}
