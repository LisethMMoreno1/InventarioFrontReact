import { typeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentification";
import config from '../../../config/config.json';
import { NewTypeOfIdentification } from "../../../interfaces/typeOfIdentification/typeOfIdentificationCreate";

const baseUrl = config.baseUrl;


/* METODO GET */
export const getTypeOfIdentifications = async (): Promise<typeOfIdentification[]> => {
  const response = await fetch(`${baseUrl}/typeOfIdentifications`, {
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
export const postTypeOfIdentifications = async (typeOfIdentificationsRequest: NewTypeOfIdentification) => {
  const response = await fetch(`${baseUrl}/typeOfIdentifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(typeOfIdentificationsRequest),
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};



/* METODO DELETE */
export const deleteTypeOfIdentifications = async (TypeOfIdentification: typeOfIdentification) => {
  const response = await fetch(`${baseUrl}/typeOfIdentifications/${TypeOfIdentification.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error en la solicitud: ${errorText}`);
  }
};