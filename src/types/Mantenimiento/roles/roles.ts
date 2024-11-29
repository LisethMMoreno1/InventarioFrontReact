import * as Yup from "yup";

export const rolesSchema = Yup.object({
    typeOfRole: Yup.string()
    .required("El nombre del tipo de identificaciones obligatorio ")
    .matches(/^[^\d]*$/, "El nombre nombre no puede contener números"),
});
