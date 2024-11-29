import { RolesInter } from "../../../interfaces/Rol/rol";
import config from '../../../config/config.json';
 
const baseUrl = config.baseUrl;


/* METODO GET */
export const getRoles = async (): Promise<RolesInter[]> => {
    const response = await fetch(`${baseUrl}/roles`, {
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
  
/* METODO POST */
export const postRoles = async (rolesRequest: RolesInter) => {
  const response = await fetch(`${baseUrl}/roles`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(rolesRequest),
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};


/* METODO DELETE */
export const deleteRoles = async (rolesInter: RolesInter) => {
  const response = await fetch(`${baseUrl}/roles/${rolesInter.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};