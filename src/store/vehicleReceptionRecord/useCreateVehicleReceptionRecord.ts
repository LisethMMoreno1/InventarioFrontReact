import { create } from "zustand";
import { createVehicleReceptionRecord } from "../../services/vehicleReceptionRecordService";
import { VehicleReceptionRecord } from "../../types/vehicleReceptionRecord/vehicleReceptionRecord.types";

interface CreateVehicleReceptionRecordState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  createRecord: (data: Partial<VehicleReceptionRecord>) => Promise<void>;
}

export const useCreateVehicleReceptionRecord =
  create<CreateVehicleReceptionRecordState>((set) => ({
    isLoading: false,
    error: null,
    success: false,

    createRecord: async (data) => {
      console.log("Llamando a createVehicleReceptionRecord con datos:", data);

      set({ isLoading: true, error: null, success: false });

      try {
        const response = await createVehicleReceptionRecord(data);
        console.log("Respuesta del servidor:", response);

        set({ success: true });
      } catch (error) {
        console.error("Error en createRecord:", error);
        set({
          error: "Error al crear el registro de recepción",
          success: false,
        });
      } finally {
        set({ isLoading: false });
        console.log("Finalizó la operación, isLoading:", false);
      }
    },
  }));
