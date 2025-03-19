import { create } from "zustand";
import { VehicleOwner } from "../../types/vehicleOwner/vehicleOwner.types";
import {
  createVehicleOwner,
  getVehicleOwners,
} from "../../services/vehicleOwner";

interface VehicleOwnerStore {
  vehicleOwners: VehicleOwner[];
  loading: boolean;
  error: string | null;
  fetchVehicleOwners: () => Promise<void>;
  addVehicleOwner: (vehicleOwner: Partial<VehicleOwner>) => Promise<void>;
}

const useVehicleOwnerStore = create<VehicleOwnerStore>((set) => ({
  vehicleOwners: [],
  loading: false,
  error: null,

  // Obtener todos los propietarios usando el servicio
  fetchVehicleOwners: async () => {
    set({ loading: true, error: null });
    try {
      const owners = await getVehicleOwners();
      set({ vehicleOwners: owners });
    } catch (error) {
      console.error("Error al obtener propietarios:", error);
      set({ error: "Error al obtener propietarios" });
    } finally {
      set({ loading: false });
    }
  },

  // Crear un nuevo propietario usando el servicio
  addVehicleOwner: async (vehicleOwner: Partial<VehicleOwner>) => {
    set({ loading: true, error: null });
    try {
      const newOwner = await createVehicleOwner(vehicleOwner);
      set((state) => ({
        vehicleOwners: [...state.vehicleOwners, newOwner],
      }));
    } catch (error) {
      console.error("Error al crear propietario:", error);
      set({ error: "Error al crear propietario" });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useVehicleOwnerStore;
