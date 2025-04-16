import { Order } from "../order/order.types";
import { VehicleOwner } from "../vehicleOwner/vehicleOwner.types";

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
  vehicleOwnerId?: number;
  vehicleOwner?: VehicleOwner;
  orders?: Order[];
  createdAt?: Date;
  updatedAt?: Date;
};
