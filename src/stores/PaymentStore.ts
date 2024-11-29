import create from "zustand";
import { PaymentI } from "../interfaces/Payment/Payment";

interface PaymentStore {
  payments: PaymentI[];
  setPayments: (payments: PaymentI[]) => void;
}

const usePaymentStore = create<PaymentStore>((set) => ({
  payments: [],
  setPayments: (payments) => set({ payments }),
}));

export default usePaymentStore;
