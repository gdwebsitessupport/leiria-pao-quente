import { createSessionCookie, clearSessionCookie, setSessionCookie } from "@/lib/session";
import { errorJson, okJson } from "@/lib/api";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { idToken?: unknown };
    const idToken = typeof body.idToken === "string" ? body.idToken : "";

    if (!idToken) {
      return errorJson("Token de autenticacao em falta.", 400, "VALIDATION_ERROR");
    }

    const sessionCookie = await createSessionCookie(idToken);
    await setSessionCookie(sessionCookie);

    return okJson({ ok: true });
  } catch {
    return errorJson("Nao foi possivel iniciar sessao.", 401, "AUTH_ERROR");
  }
}

export async function DELETE() {
  await clearSessionCookie();
  return okJson({ ok: true });
}
