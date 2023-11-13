import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/api';

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  image: string;
}
const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts(1, 8);

        if (Array.isArray(response)) {
          setProducts(response);
        } else {
          setError('Invalid response format');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isLoading={false} />
      ))}
    </div>
  );
};

export default ProductList;