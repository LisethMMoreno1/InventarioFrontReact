import * as Yup from 'yup';

export const ordenSchema = Yup.object({

  entryDate: Yup.date()
    .required("La fecha de entrada es obligatoria")
    .typeError("La fecha de entrada debe ser una fecha válida"),
});
