import { create } from "zustand";
import {
  createOrder as createOrderService,
  getOrder,
} from "../../services/orderService";
import { getVehicleReceptionRecords } from "../../services/vehicleReceptionRecordService";
import { Order } from "../../types/order/order.types";

interface OrderStore {
  orders: Order[];
  loading: boolean;
  receptionRecords: any[];
  fetchOrders: () => Promise<void>;
  createOrder: (order: Partial<Order>) => Promise<void>;
  fetchReceptionRecords: () => Promise<void>;
}

const useOrderStore = create<OrderStore>((set, get) => ({
  orders: [],
  loading: false,
  receptionRecords: [],

  // AQUÍ DEBES REEMPLAZAR LA FUNCIÓN ACTUAL POR LA NUEVA VERSIÓN
  fetchOrders: async () => {
    set({ loading: true });
    try {
      const orders = await getOrder();
      console.log("Respuesta completa de la API:", orders); // ← Esto mostrará los datos crudos
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
}));

export default useOrderStore;
