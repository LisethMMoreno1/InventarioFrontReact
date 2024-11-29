import { LoginData, LoginResponse } from "../../../interfaces/Login/SingIn";
import config from '../../../config/config.json';


const authUrl = config.baseUrl;


/* METODO POST */
export const postLogin = async (data: LoginData): Promise<LoginResponse> => {
    const response = await fetch(`${authUrl}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        throw new Error('La respuesta de la red no era correcta');
      }
    
      return response.json();
}