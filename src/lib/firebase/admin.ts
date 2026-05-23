import "server-only";
import { cert, getApp, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { getStorage } from "firebase-admin/storage";

const projectId = process.env.FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
const storageBucket = process.env.FIREBASE_STORAGE_BUCKET;

function normalizePrivateKey(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  const unquoted =
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
      ? trimmed.slice(1, -1)
      : trimmed;

  return unquoted
    .replace(/\\r\\n/g, "\n")
    .replace(/\\n/g, "\n")
    .replace(/\r\n/g, "\n");
}

const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);

if (!projectId || !clientEmail || !privateKey || !storageBucket) {
  throw new Error("Missing required Firebase Admin environment variables.");
}

const adminApp = getApps().length > 0
  ? getApp()
  : initializeApp({
      credential: cert({
        projectId,
        clientEmail,
        privateKey,
      }),
      storageBucket,
    });

export const adminAuth = getAuth(adminApp);
export const adminDb = getFirestore(adminApp);
export const adminStorage = getStorage(adminApp);
