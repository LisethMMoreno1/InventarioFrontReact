import * as Yup from "yup";

export const typeOfIdentificationsSchema = Yup.object({
  name: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),
  identifier: Yup.string()
    .required("El identificador del tipo de identificaciones obligatorio")
    .matches(/^[^\d]*$/, "El identificador  no puede contener números"),
});
