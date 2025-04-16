import { VehicleOwner } from "../types/vehicleOwner/vehicleOwner.types";
import api from "./api";

export const VehicleOwnerService = {
  getAll: () => api.get("/vehicle-owners").then((res) => res.data),
  getOne: (id: number) => api.get(`/vehicle-owners/${id}`).then((res) => res.data),
  create: (data: Partial<VehicleOwner>) => api.post("/vehicle-owners", data).then((res) => res.data),
};