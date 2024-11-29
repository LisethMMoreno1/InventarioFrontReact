import * as Yup from "yup";

export const loginSchema = Yup.object({
  identificationNumber: Yup.string().required(
    "El numero de identificación es obligatorio"
  ),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("La contraseña es obligatoria"),
});
