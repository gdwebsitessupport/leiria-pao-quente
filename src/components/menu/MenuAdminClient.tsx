"use client";

import imageCompression from "browser-image-compression";
import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  Save,
  Trash2,
  UploadCloud,
  X,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { LanguageBadges } from "@/components/menu/LanguageBadges";
import { LanguageFlag } from "@/components/menu/LanguageFlag";
import { sortCategories, sortMenuItems } from "@/lib/menu/normalize";
import type { CategoryRecord, MenuAdminData, MenuItemRecord } from "@/lib/menu/types";
import { localizeHref } from "@/lib/routes";
import type { Locale } from "@/i18n/routing";

type Toast = {
  id: number;
  kind: "success" | "error";
  message: string;
};

type ItemFormState = {
  nome_pt: string;
  nome_en: string;
  descricao_pt: string;
  descricao_en: string;
  preco: string;
  categoria: string;
  oculto: boolean;
  imageFile: File | null;
  removeImage: boolean;
};

type CategoryFormState = {
  nome_pt: string;
  nome_en: string;
  oculto: boolean;
};

type MenuAdminClientProps = {
  initialData: MenuAdminData;
  locale: Locale;
};

const baseHiddenClass = "border-ink/10 bg-white";
const mutedHiddenClass = "border-stone/20 bg-stone-100/80 text-stone-700";

function categoryVisibilityLabel(oculto: boolean): "Ocultar" | "Mostrar" {
  return oculto ? "Mostrar" : "Ocultar";
}

function parseErrorMessage(payload: unknown): string {
  if (
    typeof payload === "object" &&
    payload !== null &&
    "error" in payload &&
    typeof (payload as { error?: { message?: unknown } }).error?.message === "string"
  ) {
    return (payload as { error: { message: string } }).error.message;
  }

  return "Ocorreu um erro inesperado. Tente novamente.";
}

function formatPrice(price: number | null): string {
  if (price === null) {
    return "Preco nao definido";
  }

  return `${price.toFixed(2)} EUR`;
}

function categoryTitle(category: CategoryRecord | null): string {
  if (!category) {
    return "Sem categoria";
  }

  return category.nome_pt;
}

function toCategoryForm(category: CategoryRecord): CategoryFormState {
  return {
    nome_pt: category.nome_pt,
    nome_en: category.nome_en ?? "",
    oculto: category.oculto,
  };
}

function toItemForm(item: MenuItemRecord): ItemFormState {
  return {
    nome_pt: item.nome_pt,
    nome_en: item.nome_en ?? "",
    descricao_pt: item.descricao_pt ?? "",
    descricao_en: item.descricao_en ?? "",
    preco: item.preco === null ? "" : String(item.preco),
    categoria: item.categoria ?? "",
    oculto: item.oculto,
    imageFile: null,
    removeImage: false,
  };
}

function emptyCategoryForm(): CategoryFormState {
  return {
    nome_pt: "",
    nome_en: "",
    oculto: false,
  };
}

function emptyItemForm(defaultCategoryId: string): ItemFormState {
  return {
    nome_pt: "",
    nome_en: "",
    descricao_pt: "",
    descricao_en: "",
    preco: "",
    categoria: defaultCategoryId,
    oculto: false,
    imageFile: null,
    removeImage: false,
  };
}

function buildItemFormData(form: ItemFormState): FormData {
  const formData = new FormData();

  formData.set("nome_pt", form.nome_pt);
  formData.set("nome_en", form.nome_en);
  formData.set("descricao_pt", form.descricao_pt);
  formData.set("descricao_en", form.descricao_en);
  formData.set("preco", form.preco);
  formData.set("categoria", form.categoria);
  formData.set("oculto", String(form.oculto));
  formData.set("remove_image", String(form.removeImage));

  if (form.imageFile) {
    formData.set("image", form.imageFile);
  }

  return formData;
}

async function compressImage(file: File): Promise<File> {
  try {
    const compressed = await imageCompression(file, {
      maxSizeMB: 1,
      useWebWorker: true,
    });

    return compressed;
  } catch {
    return file;
  }
}

export function MenuAdminClient({ initialData, locale }: MenuAdminClientProps) {
  const router = useRouter();

  const [categories, setCategories] = useState<CategoryRecord[]>(sortCategories(initialData.categories));
  const [items, setItems] = useState<MenuItemRecord[]>(sortMenuItems(initialData.items));

  const [toast, setToast] = useState<Toast | null>(null);

  const [createCategoryOpen, setCreateCategoryOpen] = useState(false);
  const [createCategoryForm, setCreateCategoryForm] = useState<CategoryFormState>(emptyCategoryForm());
  const [createCategoryLoading, setCreateCategoryLoading] = useState(false);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editingCategoryForm, setEditingCategoryForm] = useState<CategoryFormState>(emptyCategoryForm());
  const [editingCategoryLoading, setEditingCategoryLoading] = useState(false);

  const [createItemOpen, setCreateItemOpen] = useState(false);
  const [createItemTab, setCreateItemTab] = useState<"pt" | "en">("pt");
  const [createItemForm, setCreateItemForm] = useState<ItemFormState>(() =>
    emptyItemForm(sortCategories(initialData.categories)[0]?.id ?? ""),
  );
  const [createItemLoading, setCreateItemLoading] = useState(false);

  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingItemTab, setEditingItemTab] = useState<"pt" | "en">("pt");
  const [editingItemForm, setEditingItemForm] = useState<ItemFormState>(emptyItemForm(""));
  const [editingItemLoading, setEditingItemLoading] = useState(false);

  const [dragCategoryId, setDragCategoryId] = useState<string | null>(null);
  const [dragItemState, setDragItemState] = useState<{ itemId: string; categoryKey: string } | null>(null);
  const toastCounterRef = useRef(0);

  const categoryById = useMemo(
    () => new Map(categories.map((category) => [category.id, category])),
    [categories],
  );

  const groupedItems = useMemo(() => {
    const groups: Array<{ key: string; category: CategoryRecord | null; items: MenuItemRecord[] }> = [];

    for (const category of categories) {
      groups.push({
        key: category.id,
        category,
        items: sortMenuItems(items.filter((item) => item.categoria === category.id)),
      });
    }

    const uncategorized = sortMenuItems(items.filter((item) => !item.categoria));
    if (uncategorized.length > 0) {
      groups.push({
        key: "uncategorized",
        category: null,
        items: uncategorized,
      });
    }

    return groups;
  }, [categories, items]);

  function showToast(kind: Toast["kind"], message: string) {
    toastCounterRef.current += 1;
    const id = toastCounterRef.current;
    setToast({ id, kind, message });

    window.setTimeout(() => {
      setToast((current) => (current?.id === id ? null : current));
    }, 3500);
  }

  async function safeFetchJson(url: string, init: RequestInit): Promise<unknown> {
    const response = await fetch(url, init);
    const payload = (await response.json().catch(() => null)) as unknown;

    if (!response.ok) {
      throw new Error(parseErrorMessage(payload));
    }

    return payload;
  }

  async function handleLogout() {
    await fetch("/api/auth/session", { method: "DELETE" });
    router.push(localizeHref("/login", locale));
    router.refresh();
  }

  async function submitCreateCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setCreateCategoryLoading(true);

    try {
      const payload = (await safeFetchJson("/api/menu/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(createCategoryForm),
      })) as { category: CategoryRecord };

      setCategories((current) => sortCategories([...current, payload.category]));
      setCreateCategoryForm(emptyCategoryForm());
      setCreateCategoryOpen(false);
      showToast("success", "Categoria criada com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao criar categoria.");
    } finally {
      setCreateCategoryLoading(false);
    }
  }

  function openCategoryEditor(category: CategoryRecord) {
    setEditingCategoryId(category.id);
    setEditingCategoryForm(toCategoryForm(category));
  }

  async function submitEditCategory(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingCategoryId) {
      return;
    }

    setEditingCategoryLoading(true);

    try {
      const payload = (await safeFetchJson(`/api/menu/categories/${editingCategoryId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingCategoryForm),
      })) as { category: CategoryRecord };

      setCategories((current) =>
        sortCategories(current.map((category) => (category.id === editingCategoryId ? payload.category : category))),
      );

      setEditingCategoryId(null);
      showToast("success", "Categoria atualizada com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao atualizar categoria.");
    } finally {
      setEditingCategoryLoading(false);
    }
  }

  async function toggleCategoryVisibility(category: CategoryRecord) {
    try {
      const payload = (await safeFetchJson(`/api/menu/categories/${category.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome_pt: category.nome_pt,
          nome_en: category.nome_en,
          oculto: !category.oculto,
        }),
      })) as { category: CategoryRecord };

      setCategories((current) =>
        sortCategories(current.map((entry) => (entry.id === category.id ? payload.category : entry))),
      );

      showToast("success", !category.oculto ? "Categoria ocultada." : "Categoria visivel novamente.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao alterar visibilidade.");
    }
  }

  async function removeCategory(categoryId: string) {
    try {
      await safeFetchJson(`/api/menu/categories/${categoryId}`, {
        method: "DELETE",
      });

      setCategories((current) => current.filter((category) => category.id !== categoryId));
      showToast("success", "Categoria apagada com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao apagar categoria.");
    }
  }

  async function reorderCategoriesOptimistic(nextCategories: CategoryRecord[]) {
    const previous = categories;
    setCategories(nextCategories);

    try {
      await safeFetchJson("/api/menu/categories/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderedIds: nextCategories.map((category) => category.id) }),
      });

      showToast("success", "Ordem das categorias atualizada.");
      router.refresh();
    } catch (error) {
      setCategories(previous);
      showToast("error", error instanceof Error ? error.message : "Falha ao reordenar categorias.");
    }
  }

  function onCategoryDrop(targetId: string) {
    if (!dragCategoryId || dragCategoryId === targetId || editingCategoryId || editingItemId) {
      setDragCategoryId(null);
      return;
    }

    const sourceIndex = categories.findIndex((category) => category.id === dragCategoryId);
    const targetIndex = categories.findIndex((category) => category.id === targetId);

    if (sourceIndex < 0 || targetIndex < 0) {
      setDragCategoryId(null);
      return;
    }

    const next = [...categories];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);

    void reorderCategoriesOptimistic(next.map((category, index) => ({ ...category, ordem: index })));
    setDragCategoryId(null);
  }

  async function submitCreateItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!createItemForm.categoria) {
      showToast("error", "Categoria e obrigatoria.");
      return;
    }

    setCreateItemLoading(true);

    try {
      let nextFile = createItemForm.imageFile;
      if (nextFile) {
        nextFile = await compressImage(nextFile);
      }

      const formToSend = buildItemFormData({ ...createItemForm, imageFile: nextFile });
      const payload = (await safeFetchJson("/api/menu/items", {
        method: "POST",
        body: formToSend,
      })) as { item: MenuItemRecord };

      setItems((current) => sortMenuItems([...current, payload.item]));
      setCreateItemOpen(false);
      setCreateItemForm(emptyItemForm(categories[0]?.id ?? ""));
      setCreateItemTab("pt");
      showToast("success", "Item criado com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao criar item.");
    } finally {
      setCreateItemLoading(false);
    }
  }

  function openItemEditor(item: MenuItemRecord) {
    setEditingItemId(item.id);
    setEditingItemTab("pt");
    setEditingItemForm(toItemForm(item));
  }

  async function submitEditItem(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!editingItemId) {
      return;
    }

    if (!editingItemForm.categoria) {
      showToast("error", "Categoria e obrigatoria.");
      return;
    }

    setEditingItemLoading(true);

    try {
      let nextFile = editingItemForm.imageFile;
      if (nextFile) {
        nextFile = await compressImage(nextFile);
      }

      const formToSend = buildItemFormData({ ...editingItemForm, imageFile: nextFile });
      const payload = (await safeFetchJson(`/api/menu/items/${editingItemId}`, {
        method: "PATCH",
        body: formToSend,
      })) as { item: MenuItemRecord };

      setItems((current) => sortMenuItems(current.map((item) => (item.id === editingItemId ? payload.item : item))));
      setEditingItemId(null);
      showToast("success", "Item atualizado com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao atualizar item.");
    } finally {
      setEditingItemLoading(false);
    }
  }

  async function toggleItemVisibility(item: MenuItemRecord) {
    const form = toItemForm(item);
    form.oculto = !item.oculto;

    try {
      const payload = (await safeFetchJson(`/api/menu/items/${item.id}`, {
        method: "PATCH",
        body: buildItemFormData(form),
      })) as { item: MenuItemRecord };

      setItems((current) => sortMenuItems(current.map((entry) => (entry.id === item.id ? payload.item : entry))));
      showToast("success", !item.oculto ? "Item ocultado." : "Item visivel novamente.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao alterar visibilidade.");
    }
  }

  async function removeItem(itemId: string) {
    try {
      await safeFetchJson(`/api/menu/items/${itemId}`, {
        method: "DELETE",
      });

      setItems((current) => current.filter((item) => item.id !== itemId));
      showToast("success", "Item apagado com sucesso.");
      router.refresh();
    } catch (error) {
      showToast("error", error instanceof Error ? error.message : "Falha ao apagar item.");
    }
  }

  async function reorderItemsOptimistic(categoryKey: string, nextGroupItems: MenuItemRecord[]) {
    const previousItems = items;
    const categoryId = categoryKey === "uncategorized" ? null : categoryKey;

    const untouchedItems = items.filter((item) => {
      if (categoryId === null) {
        return Boolean(item.categoria);
      }

      return item.categoria !== categoryId;
    });

    const merged = sortMenuItems([...untouchedItems, ...nextGroupItems]);
    setItems(merged);

    try {
      await safeFetchJson("/api/menu/items/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          categoryId,
          orderedIds: nextGroupItems.map((item) => item.id),
        }),
      });

      showToast("success", "Ordem dos itens atualizada.");
      router.refresh();
    } catch (error) {
      setItems(previousItems);
      showToast("error", error instanceof Error ? error.message : "Falha ao reordenar itens.");
    }
  }

  function onItemDrop(targetItemId: string, targetCategoryKey: string) {
    if (!dragItemState || editingItemId || editingCategoryId) {
      setDragItemState(null);
      return;
    }

    if (dragItemState.categoryKey !== targetCategoryKey || dragItemState.itemId === targetItemId) {
      setDragItemState(null);
      return;
    }

    const group = groupedItems.find((entry) => entry.key === targetCategoryKey);
    if (!group) {
      setDragItemState(null);
      return;
    }

    const sourceIndex = group.items.findIndex((item) => item.id === dragItemState.itemId);
    const targetIndex = group.items.findIndex((item) => item.id === targetItemId);

    if (sourceIndex < 0 || targetIndex < 0) {
      setDragItemState(null);
      return;
    }

    const nextGroupItems = [...group.items];
    const [moved] = nextGroupItems.splice(sourceIndex, 1);
    nextGroupItems.splice(targetIndex, 0, moved);

    const normalizedGroup = nextGroupItems.map((item, index) => ({ ...item, ordem: index }));
    void reorderItemsOptimistic(targetCategoryKey, normalizedGroup);
    setDragItemState(null);
  }

  function renderVisibilityControl(
    value: boolean,
    onChange: (value: boolean) => void,
    disabled: boolean,
  ) {
    return (
      <div className="inline-flex rounded-xl border border-ink/15 bg-white p-1">
        <button
          type="button"
          onClick={() => onChange(false)}
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            !value ? "bg-honey/50 text-ink" : "text-stone hover:text-ink"
          }`}
        >
          <Eye className="h-4 w-4" aria-hidden="true" />
          Mostrar
        </button>
        <button
          type="button"
          onClick={() => onChange(true)}
          disabled={disabled}
          className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition ${
            value ? "bg-honey/50 text-ink" : "text-stone hover:text-ink"
          }`}
        >
          <EyeOff className="h-4 w-4" aria-hidden="true" />
          Ocultar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-10 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-ink">Administracao do menu</h1>
          <p className="text-sm text-stone">Gerir categorias, itens, imagens e visibilidade publica.</p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/20 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-flour"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          Terminar sessao
        </button>
      </div>

      <section className="mx-auto w-full max-w-7xl space-y-4 rounded-3xl border border-ink/10 bg-white/70 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-ink">Categorias</h2>
          <button
            type="button"
            onClick={() => setCreateCategoryOpen((value) => !value)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm font-bold text-cream transition hover:bg-ink"
          >
            {createCategoryOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            {createCategoryOpen ? "Fechar" : "Nova categoria"}
          </button>
        </div>

        {createCategoryOpen ? (
          <form onSubmit={submitCreateCategory} className="space-y-4 rounded-2xl border border-ink/10 bg-cream p-4">
            <div>
              <label htmlFor="new-category-nome-pt" className="mb-1 block text-sm font-semibold text-ink">
                Nome (PT)
              </label>
              <input
                id="new-category-nome-pt"
                type="text"
                required
                value={createCategoryForm.nome_pt}
                onChange={(event) =>
                  setCreateCategoryForm((current) => ({ ...current, nome_pt: event.target.value }))
                }
                className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
              />
            </div>

            <div>
              <label htmlFor="new-category-nome-en" className="mb-1 block text-sm font-semibold text-ink">
                Nome (EN) (opcional)
              </label>
              <input
                id="new-category-nome-en"
                type="text"
                value={createCategoryForm.nome_en}
                onChange={(event) =>
                  setCreateCategoryForm((current) => ({ ...current, nome_en: event.target.value }))
                }
                className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
              />
            </div>

            <div>
              <p className="mb-1 text-sm font-semibold text-ink">Visibilidade</p>
              {renderVisibilityControl(
                createCategoryForm.oculto,
                (value) => setCreateCategoryForm((current) => ({ ...current, oculto: value })),
                createCategoryLoading,
              )}
            </div>

            <button
              type="submit"
              disabled={createCategoryLoading}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createCategoryLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              Guardar categoria
            </button>
          </form>
        ) : null}

        <ul className="space-y-3">
          {categories.map((category) => {
            const isEditing = editingCategoryId === category.id;

            return (
              <li
                key={category.id}
                onDragOver={(event) => event.preventDefault()}
                onDrop={() => onCategoryDrop(category.id)}
                className={`rounded-2xl border p-4 transition ${category.oculto ? mutedHiddenClass : baseHiddenClass}`}
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      aria-label="Arrastar categoria"
                      draggable={!isEditing && !editingItemId}
                      onDragStart={() => setDragCategoryId(category.id)}
                      className="rounded-md border border-ink/15 bg-white p-1 text-stone disabled:opacity-40"
                      disabled={Boolean(isEditing || editingItemId)}
                    >
                      <GripVertical className="h-4 w-4" aria-hidden="true" />
                    </button>
                    <div>
                      <p className="font-semibold text-ink">{category.nome_pt}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <LanguageBadges nome_pt={category.nome_pt} nome_en={category.nome_en} />
                        {category.oculto ? (
                          <span className="inline-flex items-center rounded-full border border-stone-300 bg-stone-200 px-2 py-1 text-xs font-semibold text-stone-700">
                            Oculto
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => openCategoryEditor(category)}
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-flour"
                    >
                      <Pencil className="h-4 w-4" aria-hidden="true" />
                      Editar
                    </button>
                    <button
                      type="button"
                      onClick={() => toggleCategoryVisibility(category)}
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-flour"
                    >
                      {category.oculto ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
                      {categoryVisibilityLabel(category.oculto)}
                    </button>
                    <button
                      type="button"
                      onClick={() => removeCategory(category.id)}
                      className="inline-flex min-h-9 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      <Trash2 className="h-4 w-4" aria-hidden="true" />
                      Apagar
                    </button>
                  </div>
                </div>

                {isEditing ? (
                  <form onSubmit={submitEditCategory} className="mt-4 space-y-4 rounded-2xl border border-ink/10 bg-white p-4">
                    <div>
                      <label htmlFor={`edit-category-pt-${category.id}`} className="mb-1 block text-sm font-semibold text-ink">
                        Nome (PT)
                      </label>
                      <input
                        id={`edit-category-pt-${category.id}`}
                        required
                        type="text"
                        value={editingCategoryForm.nome_pt}
                        onChange={(event) =>
                          setEditingCategoryForm((current) => ({ ...current, nome_pt: event.target.value }))
                        }
                        className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                      />
                    </div>

                    <div>
                      <label htmlFor={`edit-category-en-${category.id}`} className="mb-1 block text-sm font-semibold text-ink">
                        Nome (EN) (opcional)
                      </label>
                      <input
                        id={`edit-category-en-${category.id}`}
                        type="text"
                        value={editingCategoryForm.nome_en}
                        onChange={(event) =>
                          setEditingCategoryForm((current) => ({ ...current, nome_en: event.target.value }))
                        }
                        className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                      />
                    </div>

                    <div>
                      <p className="mb-1 text-sm font-semibold text-ink">Visibilidade</p>
                      {renderVisibilityControl(
                        editingCategoryForm.oculto,
                        (value) => setEditingCategoryForm((current) => ({ ...current, oculto: value })),
                        editingCategoryLoading,
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <button
                        type="submit"
                        disabled={editingCategoryLoading}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70"
                      >
                        {editingCategoryLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                        Guardar
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditingCategoryId(null)}
                        className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-flour"
                      >
                        <X className="h-4 w-4" aria-hidden="true" />
                        Cancelar
                      </button>
                    </div>
                  </form>
                ) : null}
              </li>
            );
          })}
        </ul>
      </section>

      <section className="mx-auto w-full max-w-7xl space-y-4 rounded-3xl border border-ink/10 bg-white/70 p-4 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-xl font-bold text-ink">Itens do menu</h2>
          <button
            type="button"
            onClick={() => setCreateItemOpen((value) => !value)}
            className="inline-flex min-h-10 items-center gap-2 rounded-full bg-olive px-4 py-2 text-sm font-bold text-cream transition hover:bg-ink"
          >
            {createItemOpen ? <X className="h-4 w-4" aria-hidden="true" /> : <Plus className="h-4 w-4" aria-hidden="true" />}
            {createItemOpen ? "Fechar" : "Novo item"}
          </button>
        </div>

        <p className="text-xs text-stone">
          Drag and drop e nativo do browser. Se falhar no seu browser, as acoes de editar e os formularios continuam disponiveis.
        </p>

        {createItemOpen ? (
          <form onSubmit={submitCreateItem} className="space-y-6 rounded-2xl border border-ink/10 bg-cream p-4">
            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-stone">1. Texto do item</h3>
              <div className="inline-flex rounded-xl border border-ink/15 bg-white p-1">
                <button
                  type="button"
                  onClick={() => setCreateItemTab("pt")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    createItemTab === "pt" ? "bg-honey/50 text-ink" : "text-stone"
                  }`}
                >
                  <LanguageFlag locale="pt" /> Portugues
                </button>
                <button
                  type="button"
                  onClick={() => setCreateItemTab("en")}
                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                    createItemTab === "en" ? "bg-honey/50 text-ink" : "text-stone"
                  }`}
                >
                  <LanguageFlag locale="en" /> English
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                <LanguageBadges nome_pt={createItemForm.nome_pt} nome_en={createItemForm.nome_en} />
              </div>

              {createItemTab === "pt" ? (
                <>
                  <div>
                    <label htmlFor="create-item-nome-pt" className="mb-1 block text-sm font-semibold text-ink">
                      Nome
                    </label>
                    <input
                      id="create-item-nome-pt"
                      required
                      type="text"
                      value={createItemForm.nome_pt}
                      onChange={(event) =>
                        setCreateItemForm((current) => ({ ...current, nome_pt: event.target.value }))
                      }
                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                    />
                  </div>

                  <div>
                    <label htmlFor="create-item-descricao-pt" className="mb-1 block text-sm font-semibold text-ink">
                      Descricao (opcional)
                    </label>
                    <textarea
                      id="create-item-descricao-pt"
                      value={createItemForm.descricao_pt}
                      onChange={(event) =>
                        setCreateItemForm((current) => ({ ...current, descricao_pt: event.target.value }))
                      }
                      rows={3}
                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="create-item-nome-en" className="mb-1 block text-sm font-semibold text-ink">
                      Name
                    </label>
                    <input
                      id="create-item-nome-en"
                      type="text"
                      value={createItemForm.nome_en}
                      onChange={(event) =>
                        setCreateItemForm((current) => ({ ...current, nome_en: event.target.value }))
                      }
                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                    />
                  </div>

                  <div>
                    <label htmlFor="create-item-descricao-en" className="mb-1 block text-sm font-semibold text-ink">
                      Description (optional)
                    </label>
                    <textarea
                      id="create-item-descricao-en"
                      value={createItemForm.descricao_en}
                      onChange={(event) =>
                        setCreateItemForm((current) => ({ ...current, descricao_en: event.target.value }))
                      }
                      rows={3}
                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                    />
                  </div>
                </>
              )}
            </section>

            <section className="space-y-3">
              <h3 className="text-sm font-bold uppercase tracking-wide text-stone">2. Detalhes do item</h3>

              <div>
                <label htmlFor="create-item-preco" className="mb-1 block text-sm font-semibold text-ink">
                  Preco (opcional)
                </label>
                <input
                  id="create-item-preco"
                  type="text"
                  inputMode="decimal"
                  value={createItemForm.preco}
                  onChange={(event) =>
                    setCreateItemForm((current) => ({ ...current, preco: event.target.value }))
                  }
                  className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                />
              </div>

              <div>
                <label htmlFor="create-item-categoria" className="mb-1 block text-sm font-semibold text-ink">
                  Categoria
                </label>
                <select
                  id="create-item-categoria"
                  required
                  value={createItemForm.categoria}
                  onChange={(event) =>
                    setCreateItemForm((current) => ({ ...current, categoria: event.target.value }))
                  }
                  className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                >
                  <option value="" disabled>
                    Selecionar categoria
                  </option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.nome_pt}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold text-ink">Imagem</p>
                <label className="block rounded-xl border border-dashed border-ink/25 bg-white px-4 py-4 text-sm text-stone">
                  <span className="mb-2 inline-flex items-center gap-2 font-semibold text-ink">
                    <UploadCloud className="h-4 w-4" aria-hidden="true" />
                    Escolher ficheiro
                  </span>
                  <span className="block">PNG, JPG ou WEBP ate 5MB</span>
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    disabled={createItemLoading}
                    onChange={(event) =>
                      setCreateItemForm((current) => ({
                        ...current,
                        imageFile: event.target.files?.[0] ?? null,
                      }))
                    }
                    className="mt-3 block w-full text-xs"
                  />
                </label>
              </div>

              <div>
                <p className="mb-1 text-sm font-semibold text-ink">Visibilidade</p>
                {renderVisibilityControl(
                  createItemForm.oculto,
                  (value) => setCreateItemForm((current) => ({ ...current, oculto: value })),
                  createItemLoading,
                )}
              </div>
            </section>

            <button
              type="submit"
              disabled={createItemLoading}
              className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70"
            >
              {createItemLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
              Guardar item
            </button>
          </form>
        ) : null}

        <div className="space-y-6">
          {groupedItems.map((group) => (
            <div key={group.key} className="space-y-3">
              <h3 className="text-lg font-bold text-ink">{categoryTitle(group.category)}</h3>

              {group.items.length === 0 ? (
                <p className="text-sm text-stone">Sem itens nesta categoria.</p>
              ) : (
                <ul className="space-y-3">
                  {group.items.map((item) => {
                    const isEditing = editingItemId === item.id;
                    const hiddenClass = item.oculto ? mutedHiddenClass : baseHiddenClass;

                    return (
                      <li
                        key={item.id}
                        onDragOver={(event) => event.preventDefault()}
                        onDrop={() => onItemDrop(item.id, group.key)}
                        className={`rounded-2xl border p-4 transition ${hiddenClass}`}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              aria-label="Arrastar item"
                              draggable={!isEditing && !editingCategoryId}
                              onDragStart={() => setDragItemState({ itemId: item.id, categoryKey: group.key })}
                              disabled={Boolean(isEditing || editingCategoryId)}
                              className="rounded-md border border-ink/15 bg-white p-1 text-stone disabled:opacity-40"
                            >
                              <GripVertical className="h-4 w-4" aria-hidden="true" />
                            </button>

                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <p className="font-semibold text-ink">{item.nome_pt}</p>
                                {isEditing ? (
                                  <button
                                    type="button"
                                    onClick={() => setEditingItemId((current) => (current === item.id ? null : item.id))}
                                    className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-white px-2 py-1 text-xs font-semibold text-ink"
                                  >
                                    A editar
                                    <ChevronDown className="h-3 w-3" aria-hidden="true" />
                                  </button>
                                ) : null}
                              </div>

                              <div className="mt-2 flex flex-wrap gap-2">
                                <LanguageBadges nome_pt={item.nome_pt} nome_en={item.nome_en} />
                                <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-xs font-semibold text-sky-800">
                                  {item.imagem_path ? "Com imagem" : "Sem imagem"}
                                </span>
                                {item.oculto ? (
                                  <span className="inline-flex items-center rounded-full border border-stone-300 bg-stone-200 px-2 py-1 text-xs font-semibold text-stone-700">
                                    Oculto
                                  </span>
                                ) : null}
                              </div>

                              <p className="mt-2 text-sm text-stone">
                                {item.descricao_pt?.trim() ? item.descricao_pt : "Sem descricao"}
                              </p>
                              <p className="mt-1 text-xs text-stone">
                                Categoria: {categoryTitle(item.categoria ? categoryById.get(item.categoria) ?? null : null)}
                              </p>
                              <p className="mt-1 text-xs text-stone">{formatPrice(item.preco)}</p>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => openItemEditor(item)}
                              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-flour"
                            >
                              <Pencil className="h-4 w-4" aria-hidden="true" />
                              Editar
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleItemVisibility(item)}
                              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-ink/15 bg-white px-3 py-1.5 text-sm font-semibold text-ink transition hover:bg-flour"
                            >
                              {item.oculto ? <Eye className="h-4 w-4" aria-hidden="true" /> : <EyeOff className="h-4 w-4" aria-hidden="true" />}
                              {item.oculto ? "Mostrar" : "Ocultar"}
                            </button>
                            <button
                              type="button"
                              onClick={() => removeItem(item.id)}
                              className="inline-flex min-h-9 items-center gap-2 rounded-full border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" aria-hidden="true" />
                              Apagar
                            </button>
                          </div>
                        </div>

                        {isEditing ? (
                          <form onSubmit={submitEditItem} className="mt-4 space-y-6 rounded-2xl border border-ink/10 bg-white p-4">
                            <section className="space-y-3">
                              <h4 className="text-sm font-bold uppercase tracking-wide text-stone">1. Texto do item</h4>
                              <div className="inline-flex rounded-xl border border-ink/15 bg-white p-1">
                                <button
                                  type="button"
                                  onClick={() => setEditingItemTab("pt")}
                                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                    editingItemTab === "pt" ? "bg-honey/50 text-ink" : "text-stone"
                                  }`}
                                >
                                  <LanguageFlag locale="pt" /> Portugues
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setEditingItemTab("en")}
                                  className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                                    editingItemTab === "en" ? "bg-honey/50 text-ink" : "text-stone"
                                  }`}
                                >
                                  <LanguageFlag locale="en" /> English
                                </button>
                              </div>

                              <div className="flex flex-wrap gap-2">
                                <LanguageBadges nome_pt={editingItemForm.nome_pt} nome_en={editingItemForm.nome_en} />
                              </div>

                              {editingItemTab === "pt" ? (
                                <>
                                  <div>
                                    <label htmlFor={`edit-item-nome-pt-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                      Nome
                                    </label>
                                    <input
                                      id={`edit-item-nome-pt-${item.id}`}
                                      required
                                      type="text"
                                      value={editingItemForm.nome_pt}
                                      onChange={(event) =>
                                        setEditingItemForm((current) => ({ ...current, nome_pt: event.target.value }))
                                      }
                                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                    />
                                  </div>

                                  <div>
                                    <label htmlFor={`edit-item-desc-pt-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                      Descricao (opcional)
                                    </label>
                                    <textarea
                                      id={`edit-item-desc-pt-${item.id}`}
                                      rows={3}
                                      value={editingItemForm.descricao_pt}
                                      onChange={(event) =>
                                        setEditingItemForm((current) => ({ ...current, descricao_pt: event.target.value }))
                                      }
                                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                    />
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div>
                                    <label htmlFor={`edit-item-nome-en-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                      Name
                                    </label>
                                    <input
                                      id={`edit-item-nome-en-${item.id}`}
                                      type="text"
                                      value={editingItemForm.nome_en}
                                      onChange={(event) =>
                                        setEditingItemForm((current) => ({ ...current, nome_en: event.target.value }))
                                      }
                                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                    />
                                  </div>

                                  <div>
                                    <label htmlFor={`edit-item-desc-en-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                      Description (optional)
                                    </label>
                                    <textarea
                                      id={`edit-item-desc-en-${item.id}`}
                                      rows={3}
                                      value={editingItemForm.descricao_en}
                                      onChange={(event) =>
                                        setEditingItemForm((current) => ({ ...current, descricao_en: event.target.value }))
                                      }
                                      className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                    />
                                  </div>
                                </>
                              )}
                            </section>

                            <section className="space-y-3">
                              <h4 className="text-sm font-bold uppercase tracking-wide text-stone">2. Detalhes do item</h4>

                              <div>
                                <label htmlFor={`edit-item-preco-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                  Preco (opcional)
                                </label>
                                <input
                                  id={`edit-item-preco-${item.id}`}
                                  type="text"
                                  inputMode="decimal"
                                  value={editingItemForm.preco}
                                  onChange={(event) =>
                                    setEditingItemForm((current) => ({ ...current, preco: event.target.value }))
                                  }
                                  className="w-full rounded-xl border border-ink/15 px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                />
                              </div>

                              <div>
                                <label htmlFor={`edit-item-categoria-${item.id}`} className="mb-1 block text-sm font-semibold text-ink">
                                  Categoria
                                </label>
                                <select
                                  id={`edit-item-categoria-${item.id}`}
                                  required
                                  value={editingItemForm.categoria}
                                  onChange={(event) =>
                                    setEditingItemForm((current) => ({ ...current, categoria: event.target.value }))
                                  }
                                  className="w-full rounded-xl border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition focus:border-olive"
                                >
                                  <option value="" disabled>
                                    Selecionar categoria
                                  </option>
                                  {categories.map((category) => (
                                    <option key={category.id} value={category.id}>
                                      {category.nome_pt}
                                    </option>
                                  ))}
                                </select>
                              </div>

                              <div>
                                <p className="mb-1 text-sm font-semibold text-ink">Imagem</p>
                                <label className="block rounded-xl border border-dashed border-ink/25 bg-white px-4 py-4 text-sm text-stone">
                                  <span className="mb-2 inline-flex items-center gap-2 font-semibold text-ink">
                                    <UploadCloud className="h-4 w-4" aria-hidden="true" />
                                    Escolher ficheiro
                                  </span>
                                  <span className="block">PNG, JPG ou WEBP ate 5MB</span>
                                  <input
                                    type="file"
                                    accept="image/png,image/jpeg,image/webp"
                                    disabled={editingItemLoading}
                                    onChange={(event) =>
                                      setEditingItemForm((current) => ({
                                        ...current,
                                        imageFile: event.target.files?.[0] ?? null,
                                      }))
                                    }
                                    className="mt-3 block w-full text-xs"
                                  />
                                </label>

                                {item.imagem_path ? (
                                  <div className="mt-2 space-y-1 text-sm text-stone">
                                    <label className="inline-flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={editingItemForm.removeImage}
                                        onChange={(event) =>
                                          setEditingItemForm((current) => ({
                                            ...current,
                                            removeImage: event.target.checked,
                                          }))
                                        }
                                      />
                                      Remover imagem atual
                                    </label>
                                    <p>{`Imagem atual: ${item.imagem_path}`}</p>
                                  </div>
                                ) : null}
                              </div>

                              <div>
                                <p className="mb-1 text-sm font-semibold text-ink">Visibilidade</p>
                                {renderVisibilityControl(
                                  editingItemForm.oculto,
                                  (value) => setEditingItemForm((current) => ({ ...current, oculto: value })),
                                  editingItemLoading,
                                )}
                              </div>
                            </section>

                            <div className="flex flex-wrap gap-2">
                              <button
                                type="submit"
                                disabled={editingItemLoading}
                                className="inline-flex min-h-10 items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-bold text-cream transition hover:bg-olive disabled:cursor-not-allowed disabled:opacity-70"
                              >
                                {editingItemLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> : <Save className="h-4 w-4" aria-hidden="true" />}
                                {editingItemLoading && editingItemForm.imageFile
                                  ? "A substituir imagem..."
                                  : editingItemLoading
                                    ? "A guardar..."
                                    : "Guardar"}
                              </button>
                              <button
                                type="button"
                                onClick={() => setEditingItemId(null)}
                                className="inline-flex min-h-10 items-center gap-2 rounded-full border border-ink/15 bg-white px-4 py-2 text-sm font-semibold text-ink transition hover:bg-flour"
                              >
                                <X className="h-4 w-4" aria-hidden="true" />
                                Cancelar
                              </button>
                            </div>
                          </form>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          ))}
        </div>
      </section>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="fixed left-1/2 top-24 z-[70] w-auto max-w-[92vw] -translate-x-1/2"
          >
            <div
              className={`rounded-2xl border px-4 py-2 text-center text-sm font-semibold shadow-lg ${
                toast.kind === "success"
                  ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                  : "border-red-200 bg-red-50 text-red-700"
              }`}
            >
              {toast.message}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
