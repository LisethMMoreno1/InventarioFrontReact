import config from '../../../config/config.json';
import { Category } from '../../../interfaces/Category/category';
import { SubCategory } from '../../../interfaces/SubCategory/subCategory';

const baseUrl = config.baseUrl;


/* METODO GET  Category */
export const getCategory = async (): Promise<Category[]> => {
    const response = await fetch(`${baseUrl}/categories`, {
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

/* METODO GET  SubCategory */
export const getSubCategory = async (): Promise<SubCategory[]> => {
    const response = await fetch(`${baseUrl}/subcategory`, {
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
export const postSubCategory = async (subcategoryRequest: SubCategory) => {
    const response = await fetch(`${baseUrl}/subcategory`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(subcategoryRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};



/* METODO POST   */
export const postCategory = async (categoryRequest: Category) => {
    const response = await fetch(`${baseUrl}/categories`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};
