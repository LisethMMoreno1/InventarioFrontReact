import { RolesEnum } from "../role/roles.enum";
import { Tool } from "../tool/tool.types";

export type User = {
  id_user: number;
  identificationNumber: number;
  name: string;
  email: string;
  password?: string;
  code_tool: string;
  tool: Tool;
  state: boolean;
  accessToken?: string;
  created_at: Date;
  updated_at: Date;
  role: RolesEnum;
};
