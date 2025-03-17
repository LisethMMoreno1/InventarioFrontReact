import { Order } from "../types/order/order.types";
import api from "./api";

export async function createOrder(order: Partial<Order>): Promise<Order> {
  try {
    const response = await api.post<Order>("/orders", order);
    return response.data;
  } catch (error) {
    console.error("Error al crear orders:", error);
    throw error;
  }
}

export async function getLastOrderNumber(): Promise<{
  lastOrderNumber: string;
}> {
  try {
    const response = await api.get<{ lastOrderNumber: string }>("/orders/last");
    return response.data;
  } catch (error) {
    console.error("Error al obtener el último número de orden:", error);
    throw error;
  }
}
