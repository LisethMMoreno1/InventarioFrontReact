import * as yup from "yup";

export const VehicleDeliveryRecordSchema = yup.object().shape({
  id: yup.number().required("El ID es obligatorio"),
  deliveryDate: yup.date().required("La fecha de entrega es obligatoria"),
  completedRepairs: yup
    .string()
    .min(1, "Debe especificar las reparaciones completadas")
    .required("Las reparaciones completadas son obligatorias"),
  customerSatisfaction: yup
    .boolean()
    .required("Debe indicar la satisfacción del cliente"),
  createdAt: yup.date().required("La fecha de creación es obligatoria"),
  updatedAt: yup.date().required("La fecha de actualización es obligatoria"),
});
