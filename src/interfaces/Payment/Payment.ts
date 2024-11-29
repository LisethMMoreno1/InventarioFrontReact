export interface PaymentI {
  id: number;
  subtotal: number;
  taxes: number;
  shipping: number;
  total: number;
  dateOfPayment: Date;
  paymentStatus: string;
  orderNumber: string;
  bank: {
    name : string;
  };
  order: {
    id: string;
  };
  customer: {
    identificationNumber: string;
    name: string;
  };
}
