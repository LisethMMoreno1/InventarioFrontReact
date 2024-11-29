import * as Yup from 'yup';

export const purchaseSchema = Yup.object().shape({
    productId: Yup.string().required('Product ID is required'),
    customerIdentificationNumber: Yup.string().required('Customer Identification Number is required').matches(/^\d+$/, 'Customer Identification Number must be a number'),
    quantity: Yup.number().required('Quantity is required').positive('Quantity must be a positive number').integer('Quantity must be an integer'),
});
