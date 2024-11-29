import * as Yup from "yup";

export const countrySchema = Yup.object({
  cities: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),

  codeCities: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),

  Department: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),

  codeDepartment: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),
});
