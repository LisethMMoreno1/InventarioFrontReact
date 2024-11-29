import { Category } from "../Category/category";

export interface SubCategory {
  id: number;
  subcategoryName: string;
  description: string;
  categoryId: number;
  category?: Category;
}
