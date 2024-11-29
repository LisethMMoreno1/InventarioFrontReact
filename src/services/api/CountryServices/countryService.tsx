import config from '../../../config/config.json';
import { City, Department } from '../../../interfaces/Country/country';

const baseUrl = config.baseUrl;


/* METODO GET  CIUDAD */
export const getCities = async (): Promise<City[]> => {
    const response = await fetch(`${baseUrl}/cities`, {
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

/* METODO GET  DEPARTAMENTO */
export const getDepartments = async (): Promise<Department[]> => {
    const response = await fetch(`${baseUrl}/departments`, {
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
export const postCities = async (citiesRequest: City) => {
    const response = await fetch(`${baseUrl}/cities`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(citiesRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};



/* METODO POST  DEPARTAMENTO */
export const postDepartments = async (DepartmentsRequest: Department) => {
    const response = await fetch(`${baseUrl}/departments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(DepartmentsRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};
