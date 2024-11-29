import config from '../../../config/config.json';
import { purchaseOfProductI } from '../../../interfaces/PurchaseOfProduct/purchaseOfProduct';
import { purchaseOfProduct } from '../../../interfaces/PurchaseOfProduct/purchaseOfProductReques';

const baseUrl = config.baseUrl;

/* METODO GET */
export const getPurchases = async (): Promise<purchaseOfProductI[]> => {
    try {
        const response = await fetch(`${baseUrl}/purchases`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });
        
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
export const postPurchases= async (purchaseOfProductRequest: purchaseOfProduct) => {
    const response = await fetch(`${baseUrl}/purchases`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(purchaseOfProductRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};