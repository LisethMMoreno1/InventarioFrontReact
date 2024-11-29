import React from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const showSuccessAlert = (message: string) => {
    toast.success(
        <div>
            <span role="img" aria-label="checkmark"></span> {message}
        </div>,
        {
            position: 'top-right',
            autoClose: 3000, // Cerrar después de 3 segundos
            hideProgressBar: false, // Mostrar la barra de progreso
            closeOnClick: true, // Cerrar al hacer clic
            pauseOnHover: true, // Pausar al pasar el mouse
            draggable: true, // Permitir arrastrar para cerrar
            progress: undefined, // Estilo de la barra de progreso
        }
    );
};


export const showErrorAlert = (message: string) => {
    toast.error(
        <div>
            <span role="img" aria-label="checkmark"></span> {message}
        </div>,
        {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );
};


export const showInfoAlert = (message: string) => {
    toast.info(
        <div>
            <span role="img" aria-label="checkmark"></span> {message}
        </div>,
        {
            position: 'top-right',
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        }
    );
};
