import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/api';

interface Product {
  id: number;
  title: string;
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
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
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
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '22px',
        justifyContent: 'center',
        margin: 'auto',
        maxWidth: '1110px',
      }}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isLoading={false} />
      ))}
    </div>
  );
};

export default ProductList;