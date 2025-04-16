import { create } from 'zustand'
import { createVehicleExitRecord } from '../../services/vehicleExitRecordService';
import { VehicleExitRecord } from '../../types/vehicleExitRecord/vehicleExitRecord.types'; // Asegurar import correcto

interface VehicleExitRecordStore {
  records: VehicleExitRecord[];
  loading: boolean;
  error: string | null;
  addRecord: (record: Partial<VehicleExitRecord> & { identificationNumber_vehicleOwner: string; orderNumber_order: string }) => Promise<void>;
}

export const useVehicleExitRecordStore = create<VehicleExitRecordStore>((set) => ({
  records: [],
  loading: false,
  error: null,

  addRecord: async (record) => {
    console.log("Datos recibidos en el store:", record);
    set({ loading: true, error: null });

    try {
      // Convertir identificationNumber_vehicleOwner a número y mantener orderNumber_order como string
      const newRecord = await createVehicleExitRecord({
        ...record,
        identificationNumber_vehicleOwner: Number(record.identificationNumber_vehicleOwner),
        orderNumber_order: record.orderNumber_order,
      });

      console.log("Respuesta del backend:", newRecord);

      set((state) => ({
        records: [...state.records, newRecord],
      }));
    } catch (error) {
      console.error("Error al crear el registro de salida:", error);
      set({ error: "Error al crear el registro de salida" });
    } finally {
      set({ loading: false });
    }
  }
}));
