import * as yup from "yup";

export const createUserSchema = yup.object({
  typeidentification: yup
    .number()
    .required("El tipo de identificación es requerido"),
  identificationNumber: yup
    .string()
    .required("El número de identificación es requerido"),
  name: yup.string().required("El nombre es requerido"),
  email: yup
    .string()
    .email("Debe ser un correo válido")
    .required("El correo es requerido"),
  password: yup
    .string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es requerida"),
  role: yup.string().required("El rol es requerido"),
  code_tool: yup.string().required("El código GG es requerido"),
});
