import * as Yup from 'yup';

export const VehicleExitRecordSchema = Yup.object().shape({
  id: Yup.number().required('ID is required'),
  vehicleOwner: Yup.array().min(1, 'At least one vehicle owner is required').required('Vehicle Owner is required'),
  order: Yup.array().min(1, 'At least one order is required').required('Order is required'),
  licensePlate: Yup.string().required('License plate is required'),
  exitDateTime: Yup.date().required('Exit date and time is required'),
  exitDescription: Yup.string().optional(),
  ownerSignature: Yup.string().required('Owner signature is required'),
});
