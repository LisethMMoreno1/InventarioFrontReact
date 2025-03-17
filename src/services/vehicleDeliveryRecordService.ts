import { VehicleDeliveryRecord } from "../types/vehicleDeliveryRecord/vehicleDeliveryRecord.types";
import api from "./api";

// Crear un nuevo registro
export async function createVehicleDeliveryRecord(
  vehicleDeliveryRecord: Partial<VehicleDeliveryRecord>
): Promise<VehicleDeliveryRecord> {
  try {
    const response = await api.post<VehicleDeliveryRecord>(
      "/vehicle-delivery-records",
      vehicleDeliveryRecord
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear vehicle-delivery-records:", error);
    throw error;
  }
}

// Método para obtener usuario por ID
export async function getVehicleDeliveryRecordById(
  id: number
): Promise<VehicleDeliveryRecord> {
  try {
    const response = await api.get<VehicleDeliveryRecord>(
      `/vehicle-delivery-records/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener VehicleDeliveryRecord con ID ${id}:`,
      error
    );
    throw error;
  }
}

export async function getVehicleDeliveryRecords(): Promise<
  VehicleDeliveryRecord[]
> {
  const response = await api.get<VehicleDeliveryRecord[]>(
    "/vehicle-delivery-records"
  );
  return response.data;
}
