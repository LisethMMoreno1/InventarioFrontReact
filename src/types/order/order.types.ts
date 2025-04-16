import { VehicleReceptionRecord } from "../vehicleReceptionRecord/vehicleReceptionRecord.types";

export type Order = {
  id: number;
  orderNumber: string;
  createdAt: string;
  status: "Activo" | "Completa";
  receptionRecordId: number;
  receptionRecord: VehicleReceptionRecord;
  workDetails?: string;
  cost: number | string;
};
