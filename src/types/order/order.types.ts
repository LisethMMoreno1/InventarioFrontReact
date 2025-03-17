import { VehicleDeliveryRecord } from "../vehicleDeliveryRecord/vehicleDeliveryRecord.types";
import { VehicleReceptionRecord } from "../vehicleReceptionRecord/vehicleReceptionRecord.types";

export type Order = {
  id: number;
  orderNumber: string;
  createdAt: Date;
  status: "Activo" | "Completa";
  receptionRecordId?: number; // Agregar esta propiedad
  deliveryRecordId?: number; // Agregar esta propiedad
  receptionRecord: VehicleReceptionRecord;
  deliveryRecord?: VehicleDeliveryRecord;
  workDetails?: string;
  cost: number;
};
