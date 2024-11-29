import config from '../../../config/config.json';
import { ProductIList } from '../../../interfaces/Products/listaProduct';
import { ProductI } from '../../../interfaces/Products/product';

const baseUrl = config.baseUrl;

/* METODO GET */
export const getProduct = async (): Promise<ProductIList[]> => {
    try {
        const response = await fetch(`${baseUrl}/products`);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};


/* METODO POST */
export const postProduct = async (productRequest: ProductI) => {
    const response = await fetch(`${baseUrl}/products`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(productRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};
