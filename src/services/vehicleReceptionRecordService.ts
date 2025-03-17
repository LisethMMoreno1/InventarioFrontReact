import { VehicleReceptionRecord } from "../types/vehicleReceptionRecord/vehicleReceptionRecord.types";
import api from "./api";

export async function createVehicleReceptionRecord(
  vehicleReceptionRecord: Partial<VehicleReceptionRecord>
): Promise<VehicleReceptionRecord> {
  try {
    const response = await api.post<VehicleReceptionRecord>(
      "/vehicle-reception-records",
      vehicleReceptionRecord
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear vehicleReceptionRecord:", error);
    throw error;
  }
}

// Método para obtener usuario por ID
export async function getVehicleReceptionRecordById(
  id: number
): Promise<VehicleReceptionRecord> {
  try {
    const response = await api.get<VehicleReceptionRecord>(
      `/vehicle-reception-records/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener VehicleReceptionRecord con ID ${id}:`,
      error
    );
    throw error;
  }
}

// Obtener registros de recepción de vehículos
export async function getVehicleReceptionRecords(): Promise<
  VehicleReceptionRecord[]
> {
  const response = await api.get<VehicleReceptionRecord[]>(
    "/vehicle-reception-records"
  );
  return response.data;
}
