import moment from "moment";
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

export async function getOrder(): Promise<Order[]> {
  try {
    const response = await api.get<Order[]>("/orders");

    return response.data.map((order) => ({
      ...order,
      createdAt: moment(order.createdAt).format("DD-MM-YYYY"),
      cost: Number(order.cost).toLocaleString("es-ES"),
    }));
  } catch (error) {
    console.error("Error al obtener Order:", error);
    throw error;
  }
}
