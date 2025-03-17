import { Order } from "../order/order.types";
import { VehicleDeliveryRecord } from "../vehicleDeliveryRecord/vehicleDeliveryRecord.types";

export type VehicleReceptionRecord = {
  id: number;
  arrivalDate: Date;
  arrivalCondition: string;
  diagnosis: string;
  diagnosisCost: number;
  repairProposals: string;
  invoiceDetails: string;
  contractSigned: boolean;
  advancePayment: number;
  deliveryRecord?: VehicleDeliveryRecord;
  orders?: Order[];
  createdAt?: Date;
  updatedAt?: Date;
};
