import axios from 'axios';

const API_BASE_URL = 'https://mks-frontend-challenge-04811e8151e6.herokuapp.com/api/v1';

export const getProducts = async (page: number, rows: number): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/products`, {
      params: {
        page,
        rows,
        sortBy: 'id',
        orderBy: 'DESC',
      },
      headers: {
        Accept: 'application/json',
      },
    });

    if (response.data && Array.isArray(response.data.products)) {
      return response.data.products;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
