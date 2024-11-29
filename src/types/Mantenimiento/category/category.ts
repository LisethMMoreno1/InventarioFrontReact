import * as Yup from "yup";

export const CategorySchema = Yup.object({
  categoryName: Yup.string()
    .required("El nombre de la categoría es obligatorio")
    .matches(/^[^\d]*$/, "El nombre no puede contener números"),
  description: Yup.string()
    .required("La descripción es obligatoria")
    .matches(/^[^\d]*$/, "La descripción no puede contener números"),
});

export const SubCategorySchema = Yup.object({
  subcategoryName: Yup.string().required(
    "El nombre de la subcategoría es obligatorio"
  ),
  description: Yup.string().required("La descripción es obligatoria"),
  categoryId: Yup.number().required("La categoría es obligatoria"),
});
