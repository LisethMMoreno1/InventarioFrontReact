import { VehicleExitRecord } from "../types/vehicleExitRecord/vehicleExitRecord.types";
import api from "./api";

// Método para Crear un usuario
export async function createVehicleExitRecord(vehicleExitRecord: Partial<VehicleExitRecord>): Promise<VehicleExitRecord> {
  try {
    const response = await api.post<VehicleExitRecord>("/vehicle-exit-record", vehicleExitRecord);
    return response.data;
  } catch (error) {
    console.error("Error al crear vehicleExitRecord:", error);
    throw error;
  }
}


export async function getVehicleExitRecordById(
  id: number
): Promise<VehicleExitRecord> {
  try {
    const response = await api.get<VehicleExitRecord>(
      `/vehicle-exit-record/${id}`
    );
    return response.data;
  } catch (error: any) {
    console.error(`Error al obtener vehicleExitRecord con ID ${id}:`, error);
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("Error de red, no se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message || "Error desconocido.");
    }
  }
}

export async function getVehicleExitRecords(): Promise<VehicleExitRecord[]> {
  try {
    const response = await api.get<VehicleExitRecord[]>("/vehicle-exit-record");
    return response.data;
  } catch (error: any) {
    console.error("Error al obtener vehicleExitRecords:", error);
    if (error.response) {
      throw new Error(`Error ${error.response.status}: ${error.response.data.message}`);
    } else if (error.request) {
      throw new Error("Error de red, no se recibió respuesta del servidor.");
    } else {
      throw new Error(error.message || "Error desconocido.");
    }
  }
}
