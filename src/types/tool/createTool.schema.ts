import * as Yup from "yup";

export const createToolSchema = Yup.object().shape({
  name: Yup.string().required("El nombre es obligatorio"),
  type: Yup.string()
    .min(1, "El tipo debe tener al menos 1 carácter")
    .required("El tipo es obligatorio"),
  code: Yup.string().required("El código es obligatorio"),
  description: Yup.string(),
});
