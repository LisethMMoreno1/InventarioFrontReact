import axios from "axios";
import api from "./api";
import { RolesEnum } from "../types/role/roles.enum";

export const getRoles = async (): Promise<RolesEnum[]> => {
  try {
    const response = await axios.get<RolesEnum[]>(`${api}/roles`);
    return response.data;
  } catch (error: any) {
    console.error("Error fetching roles:", error.message || error);
    throw error;
  }
};
