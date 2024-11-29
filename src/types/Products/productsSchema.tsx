import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    nameofProduct: Yup.string().required('El nombre del producto es obligatorio'),
    description: Yup.string().required('La descripción es obligatoria'),
    price: Yup.number().required('El precio del Producto es Obligatorio').positive('El precio debe ser un número positivo'),
    quantityAvailable: Yup.number().required('Se requiere la cantidad disponible'),
    categoryId: Yup.number().required('La categoría es obligatorio')
});