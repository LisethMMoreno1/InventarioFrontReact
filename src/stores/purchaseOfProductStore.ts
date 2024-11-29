import create from "zustand";
import { purchaseOfProduct } from "../interfaces/PurchaseOfProduct/purchaseOfProductReques";

interface PurchaseStore {
  purchases: purchaseOfProduct[] | null;
  setPurchases: (purchases: purchaseOfProduct[]) => void;
  clearPurchases: () => void;
}

export const usePurchaseStore = create<PurchaseStore>((set) => ({
  purchases: null,
  setPurchases: (purchases) => set({ purchases }),
  clearPurchases: () => set({ purchases: null }),
}));
