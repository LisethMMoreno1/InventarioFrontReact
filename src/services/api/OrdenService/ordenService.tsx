import config from '../../../config/config.json';
import { Orden } from '../../../interfaces/Orden/orden';

const baseUrl = config.baseUrl;

/* METODO GET */
export const getOrders = async (): Promise<Orden[]> => {
    try {
        const response = await fetch(`${baseUrl}/orders`); 
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
