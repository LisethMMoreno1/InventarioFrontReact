import { Tool } from "../tool/tool.type";

export type User = {
  id_user: number;
  identificationNumber: string;
  name: string;
  email: string;
  password?: string;
  code_tool: string;
  tool: Tool; // ✅ Agregar esta propiedad
  state: boolean;
  accessToken?: string;
  created_at: Date;
  updated_at: Date;
  role: string;
};
