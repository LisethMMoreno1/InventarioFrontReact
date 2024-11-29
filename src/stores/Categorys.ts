import create from "zustand";
import { Category } from "../interfaces/Category/category";
import { SubCategory } from "../interfaces/SubCategory/subCategory";
import {
  getCategory,
  getSubCategory,
} from "../services/api/CategoryService/CategoryService";

interface CategoriesState {
  categories: Category[];
  subcategories: SubCategory[];
  setCategories: (categories: Category[]) => void;
  setSubcategories: (subcategories: SubCategory[]) => void;
  fetchCategoriesAndSubCategories: () => Promise<void>;
}

const useCategorysStore = create<CategoriesState>((set) => ({
  categories: [],
  subcategories: [],
  setCategories: (categories) => set({ categories }),
  setSubcategories: (subcategories) => set({ subcategories }),
  fetchCategoriesAndSubCategories: async () => {
    const categories = await getCategory();
    const subcategories = await getSubCategory();
    set({ categories, subcategories });
  },
}));

export default useCategorysStore;
