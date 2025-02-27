import { User } from "../types/users/user.types";
import api from "./api";

// Obtener todos los usuarios
export async function getUsers(): Promise<User[]> {
  try {
    const response = await api.get<User[]>("/user");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Obtener usuario por ID
export async function getUserById(id: number): Promise<User> {
  try {
    const response = await api.get<User>(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
}

// Crear un usuario
export async function createUser(user: Partial<User>): Promise<User> {
  try {
    const response = await api.post<User>("/user", user);
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

// Actualizar un usuario
export async function updateUser(
  id: number,
  user: Partial<User>
): Promise<User> {
  try {
    const response = await api.put<User>(`/user/${id}`, user);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
}

// Eliminar un usuario
export async function deleteUser(id: number): Promise<void> {
  try {
    await api.delete(`/user/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
}
