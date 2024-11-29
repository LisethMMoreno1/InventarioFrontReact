import config from '../../../config/config.json';
import { PaymentI } from '../../../interfaces/Payment/Payment';

const baseUrl = config.baseUrl;

/* METODO GET */
export const getPayment = async (): Promise<PaymentI[]> => {
    try {
        const response = await fetch(`${baseUrl}/payments`);
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
export const postPayment = async (PaymentRequest: PaymentI) => {
    const response = await fetch(`${baseUrl}/payments`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(PaymentRequest),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
    }

    return await response.json();
};
