import { User } from "../../../interfaces/Users/User";
import config from '../../../config/config.json';
import { NewUser } from "../../../interfaces/Users/UserCreate";

const baseUrl = config.baseUrl;

/* METODO POST */

export async function PostUsers(userRequest: NewUser) {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userRequest),
  });

  if (!response.ok) {
    const errorDetails = await response.json();
    throw new Error(errorDetails.message || 'Error al registrar el usuario');
  }

  return response.json();
}

/* METODO GET */
export const getUsers = async (): Promise<User[]> => {
  const response = await fetch(`${baseUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },


  });
  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }
  return await response.json();
};

