
import { resetPasswordData, ResetPasswordResponse } from "../../../interfaces/Login/resetPassword";


/* METODO POST */
export const postResetPassword = async (data: resetPasswordData): Promise<ResetPasswordResponse> => {
    try {
        const response = await fetch(`http://localhost:3000/auth/request-password-reset`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Error:', response.status, errorData);
            throw new Error(`Network response was not ok: ${response.status}`);
        }

        return response.json();
    } catch (error) {
        console.error('Error in postResetPassword:', error);
        throw error;
    }
};
