import { User } from "../types/users/user.types";
import api from "./api";

// Método para obtener todos los usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>("/user");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Método para obtener usuario por ID
export async function getUserById(identificationNumber: number): Promise<User> {
  try {
    const response = await api.get<User>(`/user/${identificationNumber}`);
    return response.data;
  } catch (error) {
    console.error(
      `Error al obtener usuario con ID ${identificationNumber}:`,
      error
    );
    throw error;
  }
}

// Método para Crear un usuario
export async function createUser(user: Partial<User>): Promise<User> {
  try {
    const response = await api.post<User>("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

// Método para  Actualizar un usuario
export async function updateUser(
  identificationNumber: number,
  user: Partial<User>
): Promise<User> {
  try {
    const response = await api.put<User>(`/user/${identificationNumber}`, user);
    return response.data;
  } catch (error) {
    console.error(
      `Error al actualizar usuario con ID ${identificationNumber}:`,
      error
    );
    throw error;
  }
}

// Método para  Eliminar un usuario

export async function deleteUser(
  identificationNumber: number,
  state: number
): Promise<void> {
  try {
    await api.delete(`/user/${identificationNumber}/${state}`);
  } catch (error) {
    console.error(
      `Error al eliminar usuario con ID ${identificationNumber}:`,
      error
    );
    throw error;
  }
}
