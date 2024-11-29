import create from 'zustand';
import { Customer } from "../interfaces/Customers/customers";

interface CustomerState {
    customer: Customer | null;
    setCustomer: (customer: Customer) => void;
    clearCustomer: () => void;
  }
  
  export const useCustomerStore = create<CustomerState>((set) => ({
    customer: null,
    setCustomer: (customer) => set({ customer }),
    clearCustomer: () => set({ customer: null }),
  }));