import { VehicleOwner } from "../types/vehicleOwner/vehicleOwner.types";
import api from "./api";

// Método para obtener todos los propietarios de vehículos
export async function getVehicleOwners(): Promise<VehicleOwner[]> {
  try {
    const response = await api.get<VehicleOwner[]>("/vehicle-owners");
    return response.data;
  } catch (error) {
    console.error("Error al obtener los propietarios de vehículos:", error);
    throw error;
  }
}

// Método para Crear un VehicleOwner
export async function createVehicleOwner(
  vehicleOwner: Partial<VehicleOwner>
): Promise<VehicleOwner> {
  try {
    const response = await api.post<VehicleOwner>(
      "/vehicle-owners",
      vehicleOwner
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear VehicleOwner:", error);
    throw error;
  }
}

// Método para obtener todos los propietarios de vehículos
export async function getOneVehicleOwners(id: number): Promise<VehicleOwner[]> {
  try {
    const response = await api.get<VehicleOwner[]>(`/vehicle-owners/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los propietarios de vehículos:", error);
    throw error;
  }
}
