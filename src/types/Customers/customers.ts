import * as Yup from "yup";

export const customersSchema = Yup.object({
  typeOfIdentification: Yup.string().required(
    "El tipo de identificación es obligatorio"
  ),
  identificationNumber: Yup.number()
    .typeError("El número de identificación debe ser un número")
    .required("El número de identificación es obligatorio")
    .min(7, "El número de identificación debe tener al menos 7 caracteres"),
  name: Yup.string()
    .matches(
      /^[A-Za-zÀ-ÖØ-ÿ\s]+$/,
      "El nombre solo puede contener letras y espacios"
    )
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .max(50, "El nombre no puede tener más de 50 caracteres")
    .required("El nombre es obligatorio"),
  phone: Yup.string().matches(
    /^\+?\d{1,4}?[-.\s]?(?:\(\d{1,3}\)|\d{1,4})[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
    "El número de teléfono no es válido"
  ),
  email: Yup.string().email("El correo electrónico debe ser válido"),
  address: Yup.string(),
});
