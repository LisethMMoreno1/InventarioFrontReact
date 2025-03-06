import { Tool } from "../tool/tool.type";

export type User = {
  id_user: number;
  identificationNumber: string; // Cambiado a string porque es varchar(15) en la BD
  name: string;
  email: string;
  password?: string; // Opcional porque es nullable en la BD
  code_tool: string;
  tool: Tool;
  state: boolean;
  accessToken?: string; // Opcional porque es nullable en la BD
  created_at: Date;
  updated_at: Date;
  /*   role: Role;
  roleModule?: RoleModule;  */ // Opcional porque puede ser nullable en la BD
};
