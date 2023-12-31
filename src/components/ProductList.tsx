import React, { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { getProducts } from '../api/api';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import { Product } from '../types/types';

interface ProductListProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

const ContentContainer = styled.div`
  padding-top: 100px;
  display: grid;
  gap: 22px;
  justify-content: center;
  margin: auto;
  max-width: 1110px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const ProductList: React.FC<ProductListProps> = ({ cartItems, setCartItems }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const { query } = router;

    const activeCategory =
      typeof query.category === 'string'
        ? query.category.toLowerCase() === 'jewelry'
          ? 'jewelery'
          : query.category.toLowerCase()
        : undefined;

        const fetchData = async () => {
          try {
            const fetchedProducts = await getProducts(activeCategory);
            const filteredProducts = fetchedProducts.filter(
              (product: { category: string; }) => product.category !== 'electronics' && product.category !== 'jewelery'
            );
            setProducts(filteredProducts);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data');
          } finally {
            setLoading(false);
          }
        };

    fetchData();
  }, [router.query.category]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentContainer>
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          cartItems={cartItems}
          setCartItems={setCartItems}
        />
      ))}
    </ContentContainer>
  );
};

export default ProductList;
