import "server-only";

import { cookies } from "next/headers";
import { adminAuth } from "@/lib/firebase/admin";

const SESSION_COOKIE_NAME = "pq_session";
const SESSION_MAX_AGE_MS = 1000 * 60 * 60 * 24 * 5;

export type AdminSession = {
  uid: string;
  email: string | null;
};

export async function createSessionCookie(idToken: string): Promise<string> {
  return adminAuth.createSessionCookie(idToken, { expiresIn: SESSION_MAX_AGE_MS });
}

export async function setSessionCookie(sessionCookie: string): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE_NAME, sessionCookie, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE_MS / 1000,
  });
}

export async function clearSessionCookie(): Promise<void> {
  const store = await cookies();

  store.set(SESSION_COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 0,
  });
}

export async function getOptionalAdminSession(): Promise<AdminSession | null> {
  const store = await cookies();
  const sessionCookie = store.get(SESSION_COOKIE_NAME)?.value;

  if (!sessionCookie) {
    return null;
  }

  try {
    const decoded = await adminAuth.verifySessionCookie(sessionCookie, true);
    return {
      uid: decoded.uid,
      email: decoded.email ?? null,
    };
  } catch {
    return null;
  }
}

export async function requireAdminSession(): Promise<AdminSession> {
  const session = await getOptionalAdminSession();

  if (!session) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}
