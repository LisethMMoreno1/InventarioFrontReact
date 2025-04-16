import { create } from "zustand";
import { VehicleOwner } from "../../types/vehicleOwner/vehicleOwner.types";
import { VehicleOwnerService } from "../../services/vehicleOwner";

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
      const owners = await VehicleOwnerService.getAll();
      set({ vehicleOwners: owners });
    } catch (error) {
      console.error("Error al obtener propietarios:", error);
      set({ error: "Error al obtener propietarios" });
    } finally {
      set({ loading: false });
    }
  },

  // Agregar un nuevo propietario
  addVehicleOwner: async (vehicleOwner: Partial<VehicleOwner>) => {
    set({ loading: true, error: null });
    const newOwner = await VehicleOwnerService.create(vehicleOwner);

    if (!newOwner || typeof newOwner !== "object" || !("id" in newOwner)) {
      throw new Error("Datos inválidos al crear un propietario");
    }
    
    try {
      const newOwner: VehicleOwner = await VehicleOwnerService.create(vehicleOwner);
  
      set((state) => ({
        vehicleOwners: [...state.vehicleOwners, newOwner],
      }));
    } catch (error) {
      console.error("Error al crear propietario:", error);
      set({ error: "Error al crear propietario" });
    } finally {
      set({ loading: false });
    }
  }
  
}));

export default useVehicleOwnerStore;
