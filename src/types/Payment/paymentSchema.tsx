import * as Yup from 'yup';

export const paymentSchema = Yup.object({

    subtotal: Yup.number(),
    taxes: Yup.number(),
    shipping: Yup.number(),
    total: Yup.number(),
    dateOfPayment: Yup.date(),
    paymentStatus: Yup.string(),
    orderNumber: Yup.string(),
    bankId: Yup.number(),
    orderStatusId: Yup.number(),
    orderId: Yup.number(),
    customerIdentificationNumber: Yup.number(),

});
