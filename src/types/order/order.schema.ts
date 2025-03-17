import * as yup from "yup";

export const OrderSchemaYup = yup.object().shape({
  id: yup.number().integer().positive().required(),

  createdAt: yup.date().required(),
  status: yup
    .mixed<"Activo" | "Completa">()
    .oneOf(["Activo", "Completa"])
    .required(),
  receptionRecord: yup
    .object()
    .shape({ id: yup.number().integer().positive().required() })
    .required(),
  deliveryRecord: yup
    .object()
    .shape({ id: yup.number().integer().positive() })
    .nullable(),
  workDetails: yup.string().nullable(),
  cost: yup.number().min(0).required(),
});
