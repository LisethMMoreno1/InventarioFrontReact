import { VehicleDeliveryRecord } from "../vehicleDeliveryRecord/vehicleDeliveryRecord.types";
import { VehicleReceptionRecord } from "../vehicleReceptionRecord/vehicleReceptionRecord.types";

export type Order = {
  id: number;
  orderNumber: string;
  createdAt: string;
  status: "Activo" | "Completa";
  receptionRecordId?: number;
  deliveryRecordId?: number;
  receptionRecord: VehicleReceptionRecord;
  deliveryRecord?: VehicleDeliveryRecord;
  workDetails?: string;
  cost: number | string;
};
