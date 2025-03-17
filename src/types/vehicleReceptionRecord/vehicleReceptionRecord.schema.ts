import * as yup from "yup";

export const VehicleReceptionRecordSchema = yup.object().shape({
  arrivalDate: yup.date().required("La fecha de llegada es obligatoria"),
  arrivalCondition: yup
    .string()
    .required("La condición de llegada es obligatoria"),
  diagnosis: yup.string().required("El diagnóstico es obligatorio"),
  diagnosisCost: yup
    .number()
    .min(0, "El costo del diagnóstico no puede ser negativo")
    .required("El costo del diagnóstico es obligatorio"),
  repairProposals: yup
    .string()
    .required("Las propuestas de reparación son obligatorias"),
  invoiceDetails: yup
    .string()
    .required("Los detalles de la factura son obligatorios"),
  contractSigned: yup
    .boolean()
    .required("Debes indicar si el contrato está firmado"),
  advancePayment: yup
    .number()
    .min(0, "El pago adelantado no puede ser negativo")
    .required("El pago adelantado es obligatorio"),
});
