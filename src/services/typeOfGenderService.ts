import { TypeOfGender } from "../types/TypeOfGender/typeOfGender.types";
import api from "./api";

// Obtener todos los usuarios
export async function getTypeOfGender(): Promise<TypeOfGender[]> {
  try {
    const response = await api.get<TypeOfGender[]>("/TypeOfGender");
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Obtener usuario por ID
export async function getTypeOfGenderById(id: number): Promise<TypeOfGender> {
  try {
    const response = await api.get<TypeOfGender>(`/TypeOfGender/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
}

// Crear un usuario
export async function createTypeOfGender(
  TypeOfGender: Partial<TypeOfGender>
): Promise<TypeOfGender> {
  try {
    const response = await api.post<TypeOfGender>(
      "/TypeOfGender",
      TypeOfGender
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

// Actualizar un usuario
export async function updateTypeOfGender(
  id: number,
  TypeOfGender: Partial<TypeOfGender>
): Promise<TypeOfGender> {
  try {
    const response = await api.put<TypeOfGender>(
      `/TypeOfGender/${id}`,
      TypeOfGender
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
}

// Eliminar un usuario
export async function deleteTypeOfGender(id: number): Promise<void> {
  try {
    await api.delete(`/TypeOfGender/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
}
