import { Tool } from "../types/tool/tool.type";
import api from "./api";

export const toolsService = {
  async getAll(): Promise<Tool[]> {
    try {
      const response = await api.get("/tools");
      return response.data as Tool[];
    } catch (error) {
      console.error("Error obteniendo herramientas:", error);
      throw error;
    }
  },

  async getById(id: number): Promise<Tool> {
    try {
      const response = await api.get(`/tools/${id}`);
      return response.data as Tool;
    } catch (error) {
      console.error(`Error obteniendo herramienta con ID ${id}:`, error);
      throw error;
    }
  },

  async create(toolData: Tool): Promise<Tool> {
    try {
      const response = await api.post("/tools", toolData);
      return response.data as Tool;
    } catch (error) {
      console.error("Error creando herramienta:", error);
      throw error;
    }
  },

  // toolsService.ts
  async update(id: number, toolData: Partial<Tool>): Promise<Tool> {
    try {
      const response = await api.put(`/tools/${id}`, toolData);
      return response.data as Tool;
    } catch (error) {
      console.error(`Error actualizando herramienta con ID ${id}:`, error);
      throw error;
    }
  },

  async delete(id: number): Promise<void> {
    try {
      await api.delete(`/tools/${id}`);
    } catch (error) {
      console.error(`Error eliminando herramienta con ID ${id}:`, error);
      throw error;
    }
  },

  async getToolsByType(type: string): Promise<Tool[]> {
    try {
      const response = await api.get(`/tools/type/${type}`);
      return response.data as Tool[];
    } catch (error) {
      console.error(`Error obteniendo herramientas del tipo ${type}:`, error);
      throw error;
    }
  },

  async getToolsByCode(code: string): Promise<Tool[]> {
    try {
      const response = await api.get(`/tools/code/${code}`);
      return response.data as Tool[];
    } catch (error) {
      console.error(`Error obteniendo herramientas con código ${code}:`, error);
      throw error;
    }
  },
};
