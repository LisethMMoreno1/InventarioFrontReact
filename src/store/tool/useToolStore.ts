import { create } from "zustand";
import { toolsService } from "../../services/toolsService";
import { Tool } from "../../types/tool/tool.types";
import { ToolState } from "./toolState";

export const useToolsStore = create<ToolState>((set) => ({
  tools: [],
  selectedTool: null,
  isLoading: false,

  fetchTools: async () => {
    set({ isLoading: true });
    try {
      const data = await toolsService.getAll();
      set({ tools: data, isLoading: false });
    } catch (error) {
      console.error("Error al obtener utilitarios:", error);
      set({ isLoading: false });
    }
  },

  getToolById: async (id: number) => {
    set({ isLoading: true });
    try {
      const tool = await toolsService.getById(id);
      set({ selectedTool: tool, isLoading: false });
    } catch (error) {
      console.error("Error al obtener utilitario:", error);
      set({ isLoading: false });
    }
  },

  createTool: async (tool: Omit<Tool, "id">) => {
    try {
      const newTool: Tool = await toolsService.create(tool);
      set((state) => ({
        tools: [...state.tools, newTool],
      }));
    } catch (error) {
      console.error("Error creando utilitario:", error);
    }
  },

  updateTool: async (id, tool) => {
    set({ isLoading: true });
    try {
      await toolsService.update(id, tool);
      await useToolsStore.getState().fetchTools();
    } catch (error) {
      console.error("Error al actualizar utilitario:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  deleteTool: async (id) => {
    set({ isLoading: true });
    try {
      await toolsService.delete(id);
      await useToolsStore.getState().fetchTools();
    } catch (error) {
      console.error("Error al eliminar utilitario:", error);
    } finally {
      set({ isLoading: false });
    }
  },

  setSelectedTool: (tool) => set({ selectedTool: tool }),
}));
