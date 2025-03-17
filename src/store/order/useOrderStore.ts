import { create } from "zustand";
import { Order } from "../../types/order/order.types";
import { VehicleReceptionRecord } from "../../types/vehicleReceptionRecord/vehicleReceptionRecord.types";
import { VehicleDeliveryRecord } from "../../types/vehicleDeliveryRecord/vehicleDeliveryRecord.types";
import { createOrder as createOrderService } from "../../services/orderService";
import { getVehicleDeliveryRecords } from "../../services/vehicleDeliveryRecordService";
import { getVehicleReceptionRecords } from "../../services/vehicleReceptionRecordService";

interface OrderStore {
  createOrder: (order: Partial<Order>) => Promise<void>;
  fetchReceptionRecords: () => Promise<void>;
  fetchDeliveryRecords: () => Promise<void>;
  loading: boolean;
  receptionRecords: VehicleReceptionRecord[];
  deliveryRecords: VehicleDeliveryRecord[];
}

const useOrderStore = create<OrderStore>((set) => ({
  loading: false,
  receptionRecords: [],
  deliveryRecords: [],

  createOrder: async (order) => {
    set({ loading: true });
    try {
      await createOrderService(order);
    } finally {
      set({ loading: false });
    }
  },

  fetchReceptionRecords: async () => {
    set({ loading: true });
    try {
      const receptionRecords = await getVehicleReceptionRecords();
      set({ receptionRecords });
    } finally {
      set({ loading: false });
    }
  },

  fetchDeliveryRecords: async () => {
    set({ loading: true });
    try {
      const deliveryRecords = await getVehicleDeliveryRecords();
      set({ deliveryRecords });
    } finally {
      set({ loading: false });
    }
  },
}));

export default useOrderStore;
