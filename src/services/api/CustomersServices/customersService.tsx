import config from '../../../config/config.json';
import { Customer, CustomerCreate } from '../../../interfaces/Customers/customers';
 
const baseUrl = config.baseUrl;


/* METODO GET */
export const getCustomers = async (): Promise<Customer[]> => {
    const response = await fetch(`${baseUrl}/customers`, {
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
export const postCustomers = async (customersRequest: CustomerCreate) => {
  const response = await fetch(`${baseUrl}/customers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(customersRequest),
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
};


/* METODO DELETE */
/* export const deleteCustomers = async (GenreInter: GenreInter) => {
  const response = await fetch(`${baseUrl}/customers/${GenreInter.id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('La respuesta de la red no era correcta');
  }

  return await response.json();
}; */