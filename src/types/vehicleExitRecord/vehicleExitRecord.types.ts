export type VehicleExitRecord = {
  id: number;
  identificationNumber_vehicleOwner: number;
  orderNumber_order: string;
  licensePlate: string;
  exitDateTime: string; // Se envía en formato ISO
  exitDescription: string;
  ownerSignature: string;
};
