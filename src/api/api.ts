import axios from 'axios';

const API_BASE_URL = 'https://fakestoreapi.com';

export const getProducts = async (): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`);

    if (response.data && Array.isArray(response.data)) {
      return response.data;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
