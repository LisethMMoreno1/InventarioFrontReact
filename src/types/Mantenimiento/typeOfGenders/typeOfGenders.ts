import * as Yup from "yup";

export const typeOfGendersSchema = Yup.object({
  genre: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),
});
