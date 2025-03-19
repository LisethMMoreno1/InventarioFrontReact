import { create } from "zustand";
import { Order } from "../../types/order/order.types";
import {
  getOrder,
  createOrder as createOrderService,
} from "../../services/orderService";
import { getVehicleDeliveryRecords } from "../../services/vehicleDeliveryRecordService";
import { getVehicleReceptionRecords } from "../../services/vehicleReceptionRecordService";

interface OrderStore {
  orders: Order[];
  loading: boolean;
  receptionRecords: any[];
  deliveryRecords: any[];
  fetchOrders: () => Promise<void>;
  createOrder: (order: Partial<Order>) => Promise<void>;
  fetchReceptionRecords: () => Promise<void>;
  fetchDeliveryRecords: () => Promise<void>;
}

const useOrderStore = create<OrderStore>((set) => ({
  orders: [],
  loading: false,
  receptionRecords: [],
  deliveryRecords: [],

  fetchOrders: async () => {
    set({ loading: true });
    try {
      const orders = await getOrder();
      set({ orders });
    } finally {
      set({ loading: false });
    }
  },

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
