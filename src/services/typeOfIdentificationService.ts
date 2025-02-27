import { TypeOfIdentification } from "../types/TypeOfIdentification/typeOfIdentification.types";
import api from "./api";

// Obtener todos los usuarios
export async function getTypeOfIdentification(): Promise<
  TypeOfIdentification[]
> {
  try {
    const response = await api.get<TypeOfIdentification[]>(
      "/TypeOfIdentification"
    );
    return response.data;
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    throw error;
  }
}

// Obtener usuario por ID
export async function getTypeOfIdentificationById(
  id: number
): Promise<TypeOfIdentification> {
  try {
    const response = await api.get<TypeOfIdentification>(
      `/TypeOfIdentification/${id}`
    );
    return response.data;
  } catch (error) {
    console.error(`Error al obtener usuario con ID ${id}:`, error);
    throw error;
  }
}

// Crear un usuario
export async function createTypeOfIdentification(
  TypeOfIdentification: Partial<TypeOfIdentification>
): Promise<TypeOfIdentification> {
  try {
    const response = await api.post<TypeOfIdentification>(
      "/TypeOfIdentification",
      TypeOfIdentification
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear usuario:", error);
    throw error;
  }
}

// Actualizar un usuario
export async function updateTypeOfIdentification(
  id: number,
  TypeOfIdentification: Partial<TypeOfIdentification>
): Promise<TypeOfIdentification> {
  try {
    const response = await api.put<TypeOfIdentification>(
      `/TypeOfIdentification/${id}`,
      TypeOfIdentification
    );
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar usuario con ID ${id}:`, error);
    throw error;
  }
}

// Eliminar un usuario
export async function deleteTypeOfIdentification(id: number): Promise<void> {
  try {
    await api.delete(`/TypeOfIdentification/${id}`);
  } catch (error) {
    console.error(`Error al eliminar usuario con ID ${id}:`, error);
    throw error;
  }
}
