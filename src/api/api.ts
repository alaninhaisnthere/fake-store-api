import axios from "axios";
import { Product } from "../types/types";

const API_BASE_URL = "https://fakestoreapi.com";

export const getProducts = async (category?: string): Promise<any> => {
  try {
    const url = category
      ? `${API_BASE_URL}/products/category/${category}`
      : `${API_BASE_URL}/products`;
    const response = await axios.get(url);

    if (response.data && Array.isArray(response.data)) {
      return response.data as Product[];
    } else {
      throw new Error("Invalid response format");
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getAllUsers = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users`);
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};
