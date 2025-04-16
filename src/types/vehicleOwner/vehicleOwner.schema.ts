import * as yup from "yup";

export const vehicleOwnerSchema = yup.object({
  fullName: yup.string().required("El nombre completo es obligatorio"),
  identificationNumber: yup
    .number()
    .typeError("El número de identificación debe ser un número")
    .positive("El número de identificación debe ser positivo")
    .integer("El número de identificación debe ser un número entero")
    .required("El número de identificación es obligatorio"),
  phoneNumber: yup
    .string()
    .matches(/^[0-9]+$/, "El teléfono solo puede contener números")
    .min(7, "El teléfono debe tener al menos 7 dígitos")
    .max(15, "El teléfono no puede tener más de 15 dígitos")
    .required("El teléfono es obligatorio"),
  email: yup.string().email("El correo electrónico no es válido").optional(),
  address: yup.string().optional(),
  vehicleBrand: yup.string().required("La marca del vehículo es obligatoria"),
  vehicleModel: yup.string().required("El modelo del vehículo es obligatorio"),
  licensePlate: yup
    .string()
    .required("La placa del vehículo es obligatoria"),
  vehicleColor: yup.string().required("El color del vehículo es obligatorio"),
  insuranceValid: yup.boolean().required("El seguro vigente es obligatorio"),
  specialInstructions: yup.string().optional(),
  authorizedForPickup: yup
    .boolean()
    .required("Debe indicar si está autorizado para retiro"),
  receptionRecords: yup.array().optional(),
  createdAt: yup.date().optional(),
  updatedAt: yup.date().optional(),
});
