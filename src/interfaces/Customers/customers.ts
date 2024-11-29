import { Orden } from "../Orden/orden";

export interface Customer {
  id?: number;
  typeOfIdentification: {
    name: string;
  };
  identificationNumber: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  order: Orden[];
}

export interface CustomerCreate {
  id: number;
  typeOfIdentification: string;
  identificationNumber: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  order?: Orden;
}
