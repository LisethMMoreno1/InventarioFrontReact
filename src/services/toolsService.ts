import { Tool } from "../types/tool/tool.types"; // Importa la definición del tipo Tool
import api from "./api"; // Importa la instancia de API configurada para hacer peticiones HTTP

// Definición del servicio toolsService, que contiene métodos para interactuar con la API de ultilitarios
export const toolsService = {
  // Método para obtener todas las ultilitarios
  async getAll(): Promise<Tool[]> {
    try {
      const response = await api.get("/tools"); // Realiza una solicitud GET a la API
      return response.data as Tool[]; // Retorna la lista de ultilitarios
    } catch (error) {
      console.error("Error obteniendo ultilitarios:", error); // Manejo del error
      throw error; // Lanza el error para ser manejado en el nivel superior
    }
  },

  // Método para obtener una ultilitario por su ID
  async getById(id: number): Promise<Tool> {
    try {
      const response = await api.get(`/tools/${id}`);
      return response.data as Tool;
    } catch (error) {
      console.error(`Error obteniendo ultilitario con ID ${id}:`, error);
      throw error;
    }
  },

  // Método para crear una nueva ultilitario
  async create(toolData: Omit<Tool, "id">): Promise<Tool> {
    try {
      const response = await api.post("/tools", toolData);
      return response.data as Tool; 
    } catch (error) {
      console.error("Error creando utilitario:", error);
      throw error;
    }
  },

  // Método para actualizar una ultilitario existente por su ID
  async update(id: number, toolData: Partial<Tool>): Promise<Tool> {
    try {
      const response = await api.put(`/tools/${id}`, toolData);
      return response.data as Tool;
    } catch (error) {
      console.error(`Error actualizando ultilitario con ID ${id}:`, error);
      throw error;
    }
  },

  // Método para eliminar una ultilitario por su ID
  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/tools/${id}`);
    } catch (error) {
      console.error(`Error eliminando ultilitario con ID ${id}:`, error);
      throw error;
    }
  },

  // Método para obtener ultilitarios por tipo
  async getToolsByType(type: string): Promise<Tool[]> {
    try {
      const response = await api.get(`/tools/type/${type}`);
      return response.data as Tool[];
    } catch (error) {
      console.error(`Error obteniendo ultilitarios del tipo ${type}:`, error);
      throw error;
    }
  },

  // Método para obtener ultilitarios por código
  async getToolsByCode(code: string): Promise<Tool[]> {
    try {
      const response = await api.get(`/tools/code/${code}`);
      return response.data as Tool[];
    } catch (error) {
      console.error(`Error obteniendo ultilitarios con código ${code}:`, error);
      throw error;
    }
  },
};
