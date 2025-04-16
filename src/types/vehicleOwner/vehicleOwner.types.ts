import { Order } from "../order/order.types";
import { VehicleReceptionRecord } from "../vehicleReceptionRecord/vehicleReceptionRecord.types";

export type VehicleOwner = {
  id?: number;
  fullName: string;
  identificationNumber: number;
  phoneNumber: string;
  email?: string;
  address?: string;
  vehicleBrand: string;
  vehicleModel: string;
  licensePlate: string;
  vehicleColor: string;
  insuranceValid: boolean;
  specialInstructions?: string;
  authorizedForPickup: boolean;
  receptionRecords?: VehicleReceptionRecord[];
  orders?: Order[];
  createdAt?: Date;
  updatedAt?: Date;
};
