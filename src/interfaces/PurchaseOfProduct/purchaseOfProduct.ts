export interface purchaseOfProductI {
  id: number;
  product: {
    nameofProduct: string;
    price: number;
  };
  customer: {
    identificationNumber: string;
  };
  quantity: number;
  purchaseCode?: string;
}


