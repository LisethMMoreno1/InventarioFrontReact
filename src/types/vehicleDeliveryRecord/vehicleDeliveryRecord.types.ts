import { Order } from "../order/order.types";
import { VehicleReceptionRecord } from "../vehicleReceptionRecord/vehicleReceptionRecord.types";

export type VehicleDeliveryRecord = {
  id: number;
  deliveryDate: Date;
  completedRepairs: string;
  customerSatisfaction: boolean;
  receptionRecord: VehicleReceptionRecord;
  orders: Order[];
  createdAt?: Date;
  updatedAt?: Date;
};
