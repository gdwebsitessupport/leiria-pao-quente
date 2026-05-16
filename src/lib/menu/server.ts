import "server-only";

import { randomUUID } from "node:crypto";
import sharp from "sharp";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb, adminStorage } from "@/lib/firebase/admin";
import {
  normalizeBoolean,
  normalizeTimestamp,
  nullableNumber,
  nullableTrimmed,
  requiredTrimmed,
  sortCategories,
  sortMenuItems,
} from "@/lib/menu/normalize";
import type {
  CategoryRecord,
  LocaleCode,
  MenuAdminData,
  MenuItemRecord,
  PublicMenuGroup,
} from "@/lib/menu/types";

const CATEGORY_COLLECTION = "categorias";
const MENU_COLLECTION = "menus";
const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;
const IMAGE_FOLDER = "menu-imagens";

export type CategoryInput = {
  nome_pt: unknown;
  nome_en?: unknown;
  oculto?: unknown;
};

export type MenuItemInput = {
  nome_pt: unknown;
  nome_en?: unknown;
  descricao_pt?: unknown;
  descricao_en?: unknown;
  preco?: unknown;
  categoria: unknown;
  oculto?: unknown;
};

type NormalizedCategoryInput = {
  nome_pt: string;
  nome_en: string | null;
  oculto: boolean;
};

type NormalizedMenuItemInput = {
  nome_pt: string;
  nome_en: string | null;
  descricao_pt: string | null;
  descricao_en: string | null;
  preco: number | null;
  categoria: string;
  oculto: boolean;
};

export type MenuItemMutationResult = {
  item: MenuItemRecord;
};

export class DomainError extends Error {
  constructor(message: string, readonly code: string) {
    super(message);
  }
}

function mapCategoryDoc(id: string, data: Record<string, unknown>): CategoryRecord {
  return {
    id,
    nome_pt: requiredTrimmed(data.nome_pt, "Nome PT obrigatorio."),
    nome_en: nullableTrimmed(data.nome_en),
    ordem: nullableNumber(data.ordem),
    oculto: normalizeBoolean(data.oculto, false),
  };
}

function mapMenuDoc(id: string, data: Record<string, unknown>): MenuItemRecord {
  return {
    id,
    created_at: normalizeTimestamp(data.created_at),
    nome_pt: requiredTrimmed(data.nome_pt, "Nome PT obrigatorio."),
    nome_en: nullableTrimmed(data.nome_en),
    descricao_pt: nullableTrimmed(data.descricao_pt),
    descricao_en: nullableTrimmed(data.descricao_en),
    preco: nullableNumber(data.preco),
    categoria: nullableTrimmed(data.categoria),
    ordem: nullableNumber(data.ordem),
    imagem_path: nullableTrimmed(data.imagem_path),
    oculto: normalizeBoolean(data.oculto, false),
  };
}

async function getAllCategories(): Promise<CategoryRecord[]> {
  const snapshot = await adminDb.collection(CATEGORY_COLLECTION).get();

  const categories = snapshot.docs.map((doc) =>
    mapCategoryDoc(doc.id, doc.data() as Record<string, unknown>),
  );

  return sortCategories(categories);
}

async function getAllItems(): Promise<MenuItemRecord[]> {
  const snapshot = await adminDb.collection(MENU_COLLECTION).get();

  const items = snapshot.docs.map((doc) =>
    mapMenuDoc(doc.id, doc.data() as Record<string, unknown>),
  );

  return sortMenuItems(items);
}

function normalizeCategoryInput(input: CategoryInput): NormalizedCategoryInput {
  return {
    nome_pt: requiredTrimmed(input.nome_pt, "Nome (PT) da categoria e obrigatorio."),
    nome_en: nullableTrimmed(input.nome_en),
    oculto: normalizeBoolean(input.oculto, false),
  };
}

function normalizeMenuInput(input: MenuItemInput): NormalizedMenuItemInput {
  const nome_pt = requiredTrimmed(input.nome_pt, "Nome (PT) do item e obrigatorio.");
  const categoria = requiredTrimmed(input.categoria, "Categoria e obrigatoria.");
  const preco = nullableNumber(input.preco);

  if (preco !== null && preco < 0) {
    throw new DomainError("Preco deve ser um numero igual ou superior a 0.", "VALIDATION_ERROR");
  }

  return {
    nome_pt,
    nome_en: nullableTrimmed(input.nome_en),
    descricao_pt: nullableTrimmed(input.descricao_pt),
    descricao_en: nullableTrimmed(input.descricao_en),
    preco,
    categoria,
    oculto: normalizeBoolean(input.oculto, false),
  };
}

async function categoryExists(categoryId: string): Promise<boolean> {
  const doc = await adminDb.collection(CATEGORY_COLLECTION).doc(categoryId).get();
  return doc.exists;
}

async function getNextCategoryOrder(): Promise<number> {
  const categories = await getAllCategories();
  const currentMax = categories.reduce((max, category) => {
    if (category.ordem === null) {
      return max;
    }

    return Math.max(max, category.ordem);
  }, -1);

  return currentMax + 1;
}

async function getNextItemOrder(categoryId: string): Promise<number> {
  const items = await getAllItems();
  const currentMax = items
    .filter((item) => item.categoria === categoryId)
    .reduce((max, item) => {
      if (item.ordem === null) {
        return max;
      }

      return Math.max(max, item.ordem);
    }, -1);

  return currentMax + 1;
}

function slugifySafe(value: string): string {
  const normalized = value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-+/g, "-");

  return normalized || "item";
}

async function normalizeImageToWebp(file: File): Promise<Buffer> {
  if (!file.type.startsWith("image/")) {
    throw new DomainError("So sao aceites ficheiros de imagem.", "VALIDATION_ERROR");
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    throw new DomainError("A imagem excede o limite de 5MB.", "VALIDATION_ERROR");
  }

  const bytes = Buffer.from(await file.arrayBuffer());

  return sharp(bytes).rotate().webp({ quality: 82 }).toBuffer();
}

function makeImagePath(itemName: string): string {
  const datePrefix = new Date().toISOString().slice(0, 10);
  const slug = slugifySafe(itemName);
  return `${IMAGE_FOLDER}/${datePrefix}/${slug}-${randomUUID()}.webp`;
}

export async function uploadMenuImage(file: File, itemName: string): Promise<string> {
  const webpBuffer = await normalizeImageToWebp(file);
  const path = makeImagePath(itemName);
  const bucket = adminStorage.bucket();
  const objectRef = bucket.file(path);

  await objectRef.save(webpBuffer, {
    contentType: "image/webp",
    resumable: false,
    metadata: {
      cacheControl: "public, max-age=31536000, immutable",
    },
  });

  return path;
}

export async function deleteMenuImage(path: string | null | undefined): Promise<void> {
  if (!path) {
    return;
  }

  await adminStorage.bucket().file(path).delete({ ignoreNotFound: true });
}

export function getImagePublicUrl(path: string | null): string | null {
  if (!path) {
    return null;
  }

  const bucket = process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ?? process.env.FIREBASE_STORAGE_BUCKET;
  if (!bucket) {
    return null;
  }

  return `https://firebasestorage.googleapis.com/v0/b/${bucket}/o/${encodeURIComponent(path)}?alt=media`;
}

export async function getAdminMenuData(): Promise<MenuAdminData> {
  const [categories, items] = await Promise.all([getAllCategories(), getAllItems()]);

  return {
    categories,
    items,
  };
}

export async function getPublicMenu(locale: LocaleCode): Promise<PublicMenuGroup[]> {
  const [allCategories, allItems] = await Promise.all([getAllCategories(), getAllItems()]);

  const visibleCategories = allCategories.filter((category) => !category.oculto);
  const hiddenCategoryIds = new Set(
    allCategories.filter((category) => category.oculto).map((category) => category.id),
  );

  const visibleItems = allItems.filter(
    (item) => !item.oculto && (!item.categoria || !hiddenCategoryIds.has(item.categoria)),
  );

  const grouped: PublicMenuGroup[] = visibleCategories.map((category) => {
    const items = sortMenuItems(visibleItems.filter((item) => item.categoria === category.id));

    return {
      category,
      key: category.id,
      title: locale === "en" ? category.nome_en ?? category.nome_pt : category.nome_pt,
      items,
      hasAnyImage: items.some((item) => Boolean(item.imagem_path)),
    };
  });

  const uncategorizedItems = sortMenuItems(
    visibleItems.filter(
      (item) => !item.categoria || !visibleCategories.some((category) => category.id === item.categoria),
    ),
  );

  if (uncategorizedItems.length > 0) {
    grouped.push({
      category: null,
      key: "uncategorized",
      title: locale === "en" ? "Uncategorized" : "Sem categoria",
      items: uncategorizedItems,
      hasAnyImage: uncategorizedItems.some((item) => Boolean(item.imagem_path)),
    });
  }

  return grouped;
}

export async function createCategory(input: CategoryInput): Promise<CategoryRecord> {
  const normalized = normalizeCategoryInput(input);
  const ordem = await getNextCategoryOrder();

  const ref = await adminDb.collection(CATEGORY_COLLECTION).add({
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    ordem,
    oculto: normalized.oculto,
  });

  return {
    id: ref.id,
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    ordem,
    oculto: normalized.oculto,
  };
}

export async function updateCategory(id: string, input: CategoryInput): Promise<CategoryRecord> {
  const normalized = normalizeCategoryInput(input);
  const ref = adminDb.collection(CATEGORY_COLLECTION).doc(id);
  const current = await ref.get();

  if (!current.exists) {
    throw new DomainError("Categoria nao encontrada.", "NOT_FOUND");
  }

  await ref.update({
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    oculto: normalized.oculto,
  });

  const currentOrder = nullableNumber((current.data() as Record<string, unknown>).ordem);

  return {
    id,
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    ordem: currentOrder,
    oculto: normalized.oculto,
  };
}

export async function deleteCategory(id: string): Promise<void> {
  const associatedItems = await adminDb
    .collection(MENU_COLLECTION)
    .where("categoria", "==", id)
    .limit(1)
    .get();

  if (!associatedItems.empty) {
    throw new DomainError("Nao pode apagar categorias com itens associados.", "CATEGORY_HAS_ITEMS");
  }

  await adminDb.collection(CATEGORY_COLLECTION).doc(id).delete();
}

export async function createMenuItem(input: MenuItemInput, imageFile: File | null): Promise<MenuItemMutationResult> {
  const normalized = normalizeMenuInput(input);

  if (!(await categoryExists(normalized.categoria))) {
    throw new DomainError("Categoria invalida.", "VALIDATION_ERROR");
  }

  const ordem = await getNextItemOrder(normalized.categoria);
  const imagePath = imageFile ? await uploadMenuImage(imageFile, normalized.nome_pt) : null;

  const ref = await adminDb.collection(MENU_COLLECTION).add({
    created_at: FieldValue.serverTimestamp(),
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    descricao_pt: normalized.descricao_pt,
    descricao_en: normalized.descricao_en,
    preco: normalized.preco,
    categoria: normalized.categoria,
    ordem,
    imagem_path: imagePath,
    oculto: normalized.oculto,
  });

  const created = await ref.get();

  return {
    item: mapMenuDoc(created.id, created.data() as Record<string, unknown>),
  };
}

export async function updateMenuItem(
  id: string,
  input: MenuItemInput,
  imageFile: File | null,
  removeImage: boolean,
): Promise<MenuItemMutationResult> {
  const normalized = normalizeMenuInput(input);
  const ref = adminDb.collection(MENU_COLLECTION).doc(id);
  const current = await ref.get();

  if (!current.exists) {
    throw new DomainError("Item nao encontrado.", "NOT_FOUND");
  }

  if (!(await categoryExists(normalized.categoria))) {
    throw new DomainError("Categoria invalida.", "VALIDATION_ERROR");
  }

  const currentData = mapMenuDoc(current.id, current.data() as Record<string, unknown>);
  const categoryChanged = currentData.categoria !== normalized.categoria;

  let nextImagePath = currentData.imagem_path;

  if (imageFile) {
    const uploadedPath = await uploadMenuImage(imageFile, normalized.nome_pt);
    await deleteMenuImage(currentData.imagem_path);
    nextImagePath = uploadedPath;
  }

  if (removeImage && !imageFile) {
    await deleteMenuImage(currentData.imagem_path);
    nextImagePath = null;
  }

  const nextOrder = categoryChanged ? await getNextItemOrder(normalized.categoria) : currentData.ordem;

  await ref.update({
    nome_pt: normalized.nome_pt,
    nome_en: normalized.nome_en,
    descricao_pt: normalized.descricao_pt,
    descricao_en: normalized.descricao_en,
    preco: normalized.preco,
    categoria: normalized.categoria,
    ordem: nextOrder,
    imagem_path: nextImagePath,
    oculto: normalized.oculto,
  });

  const updated = await ref.get();

  return {
    item: mapMenuDoc(updated.id, updated.data() as Record<string, unknown>),
  };
}

export async function deleteMenuItem(id: string): Promise<void> {
  const ref = adminDb.collection(MENU_COLLECTION).doc(id);
  const current = await ref.get();

  if (!current.exists) {
    throw new DomainError("Item nao encontrado.", "NOT_FOUND");
  }

  const item = mapMenuDoc(current.id, current.data() as Record<string, unknown>);

  await Promise.all([ref.delete(), deleteMenuImage(item.imagem_path)]);
}

function sameMembers(left: string[], right: string[]): boolean {
  if (left.length !== right.length) {
    return false;
  }

  const leftSet = new Set(left);
  if (leftSet.size !== right.length) {
    return false;
  }

  return right.every((value) => leftSet.has(value));
}

export async function reorderCategories(orderedIds: string[]): Promise<CategoryRecord[]> {
  const categories = await getAllCategories();
  const currentIds = categories.map((category) => category.id);

  if (!sameMembers(currentIds, orderedIds)) {
    throw new DomainError("Lista de categorias invalida para reordenacao.", "VALIDATION_ERROR");
  }

  const batch = adminDb.batch();

  orderedIds.forEach((id, index) => {
    const ref = adminDb.collection(CATEGORY_COLLECTION).doc(id);
    batch.update(ref, { ordem: index });
  });

  await batch.commit();

  return orderedIds.map((id, index) => {
    const category = categories.find((entry) => entry.id === id)!;

    return {
      ...category,
      ordem: index,
    };
  });
}

export async function reorderMenuItems(categoryId: string | null, orderedIds: string[]): Promise<MenuItemRecord[]> {
  const items = await getAllItems();

  const groupItems = items.filter((item) => {
    if (categoryId === null) {
      return !item.categoria;
    }

    return item.categoria === categoryId;
  });

  const groupIds = groupItems.map((item) => item.id);

  if (!sameMembers(groupIds, orderedIds)) {
    throw new DomainError("Lista de itens invalida para reordenacao.", "VALIDATION_ERROR");
  }

  const batch = adminDb.batch();

  orderedIds.forEach((id, index) => {
    const ref = adminDb.collection(MENU_COLLECTION).doc(id);
    batch.update(ref, { ordem: index });
  });

  await batch.commit();

  return orderedIds.map((id, index) => {
    const item = groupItems.find((entry) => entry.id === id)!;

    return {
      ...item,
      ordem: index,
    };
  });
}

export function toSafeError(error: unknown): { status: number; message: string; code: string } {
  if (error instanceof DomainError) {
    if (error.code === "NOT_FOUND") {
      return { status: 404, message: error.message, code: error.code };
    }

    if (error.code === "UNAUTHORIZED") {
      return { status: 401, message: "Sessao invalida.", code: error.code };
    }

    return { status: 400, message: error.message, code: error.code };
  }

  if (error instanceof Error && error.message === "UNAUTHORIZED") {
    return { status: 401, message: "Sessao obrigatoria.", code: "UNAUTHORIZED" };
  }

  return {
    status: 500,
    message: "Ocorreu um erro inesperado. Tente novamente.",
    code: "INTERNAL_ERROR",
  };
}
