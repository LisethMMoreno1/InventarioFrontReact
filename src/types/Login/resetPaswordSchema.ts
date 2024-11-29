import * as Yup from "yup";

export const resetPaswordSchema = Yup.object({
  identificationNumber: Yup.string().required(
    "El numero de identificación es obligatorio"
  ),
});
