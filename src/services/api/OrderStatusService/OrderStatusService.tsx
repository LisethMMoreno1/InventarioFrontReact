import config from '../../../config/config.json';
import { OrderStatusI } from '../../../interfaces/OrderStatus/OrderStatus';

const baseUrl = config.baseUrl;

/* METODO GET */
export const getOrderStatus = async (): Promise<OrderStatusI[]> => {
    try {
        const response = await fetch(`${baseUrl}/orderStatus`); 
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
