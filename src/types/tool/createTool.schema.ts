import * as Yup from "yup";

export const createToolSchema = Yup.object({
  name: Yup.string().required("El nombre es requerido"),
  type: Yup.string()
    .required("El tipo es requerido")
    .length(1, "El tipo debe tener 1 carácter"),
  code: Yup.string().required("El código es requerido"),
  description: Yup.string().required("La descripción es requerida"),
});
