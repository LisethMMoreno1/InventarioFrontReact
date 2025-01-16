import axios from "axios";
import config from "../../../config/config.json";
import { Category } from "../../../interfaces/Category/category";
import { SubCategory } from "../../../interfaces/SubCategory/subCategory";

const baseUrl = config.baseUrl;

/* METODO GET  Category */
export const getCategory = async (): Promise<Category[]> => {
  try {
    const response = await axios.get(`${baseUrl}/categories`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener categorías: ${error}`);
  }
};

/* METODO GET  SubCategory */
export const getSubCategory = async (): Promise<SubCategory[]> => {
  try {
    const response = await axios.get(`${baseUrl}/subcategory`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(`Error al obtener subcategorías: ${error}`);
  }
};

/* METODO POST SubCategory */
export const postSubCategory = async (subcategoryRequest: SubCategory) => {
  try {
    const response = await axios.post(
      `${baseUrl}/subcategory`,
      subcategoryRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear subcategoría: ${error}`);
  }
};

/* METODO POST Category */
export const postCategory = async (categoryRequest: Category) => {
  try {
    const response = await axios.post(
      `${baseUrl}/categories`,
      categoryRequest,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(`Error al crear categoría: ${error}`);
  }
};
