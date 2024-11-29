

import create from "zustand";
import { ProductIList } from "../interfaces/Products/listaProduct";

interface ProductsStore {
  products: ProductIList[];
  setProducts: (products: ProductIList[]) => void;
}

export const useProductsStore = create<ProductsStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
