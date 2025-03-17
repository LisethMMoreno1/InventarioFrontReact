import { RolesEnum } from "../../types/role/roles.enum";

export interface UserFormData {
  name: string;
  email: string;
  password?: string;
  code_tool: string;
  identificationNumber: number;
  role: RolesEnum;
  tool?: { code: string };
}
