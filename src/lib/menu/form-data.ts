import type { MenuItemInput } from "@/lib/menu/server";

export function parseMenuItemFormData(formData: FormData): {
  input: MenuItemInput;
  imageFile: File | null;
  removeImage: boolean;
} {
  const imageValue = formData.get("image");
  const imageFile = imageValue instanceof File && imageValue.size > 0 ? imageValue : null;
  const removeImageValue = formData.get("remove_image");

  return {
    input: {
      nome_pt: formData.get("nome_pt"),
      nome_en: formData.get("nome_en"),
      descricao_pt: formData.get("descricao_pt"),
      descricao_en: formData.get("descricao_en"),
      preco: formData.get("preco"),
      categoria: formData.get("categoria"),
      oculto: formData.get("oculto") === "true",
    },
    imageFile,
    removeImage: removeImageValue === "true",
  };
}
