import { create } from "zustand";
import { VehicleDeliveryRecord } from "../../types/vehicleDeliveryRecord/vehicleDeliveryRecord.types";
import { createVehicleDeliveryRecord } from "../../services/vehicleDeliveryRecordService";

interface VehicleDeliveryState {
  records: VehicleDeliveryRecord[];
  addRecord: (record: Partial<VehicleDeliveryRecord>) => Promise<void>;
  setRecords: (records: VehicleDeliveryRecord[]) => void;
}

export const useVehicleDeliveryStore = create<VehicleDeliveryState>((set) => ({
  records: [],

  addRecord: async (record) => {
    try {
      const newRecord = await createVehicleDeliveryRecord(record);
      set((state) => ({ records: [...state.records, newRecord] }));
    } catch (error) {
      console.error("Error al agregar el registro de entrega:", error);
    }
  },

  setRecords: (records) => set({ records }),
}));
