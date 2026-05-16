export type LocaleCode = "pt" | "en";

export type CategoryRecord = {
  id: string;
  nome_pt: string;
  nome_en: string | null;
  ordem: number | null;
  oculto: boolean;
};

export type MenuItemRecord = {
  id: string;
  created_at: string | null;
  nome_pt: string;
  nome_en: string | null;
  descricao_pt: string | null;
  descricao_en: string | null;
  preco: number | null;
  categoria: string | null;
  ordem: number | null;
  imagem_path: string | null;
  oculto: boolean;
};

export type PublicMenuGroup = {
  category: CategoryRecord | null;
  key: string;
  title: string;
  items: MenuItemRecord[];
  hasAnyImage: boolean;
};

export type MenuAdminData = {
  categories: CategoryRecord[];
  items: MenuItemRecord[];
};
