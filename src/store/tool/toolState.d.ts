import { Tool } from "./tool.type"; // Asegúrate de que la ruta sea correcta

export interface ToolState {
  tools: Tool[];
  selectedTool: Tool | null;
  isLoading: boolean;
  setSelectedTool: (tool: Tool | null) => void;
  fetchTools: () => Promise<void>;
  getToolById: (id: number) => Promise<void>;
  createTool: (tool: Tool) => Promise<void>; // Tipado corregido
  updateTool: (id: number, tool: Partial<Tool>) => Promise<void>;
  deleteTool: (id: number) => Promise<void>;
}
