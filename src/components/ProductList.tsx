import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/api';
import styled from 'styled-components';
import Skeleton from './Skeleton';

const Container = styled.div`
  padding: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 16px;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  margin-bottom: 8px;
`;

const ProductName = styled.strong`
  font-weight: bold;
`;

const ProductPrice = styled.span`
  font-weight: normal;
`;

const SkeletonContainer = styled.div`
  animation: pulse 1.5s infinite;
  background-color: #ccc;
  border-radius: 4px;
  height: 10px;
  width: 40px;
  margin-bottom: 4px;
`;

interface Product {
  id: number;
  name: string;
  price: string;
}

interface ApiResponse {
  products: Product[];
  count: number;
}

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response: ApiResponse = await getProducts(1, 5);
        const productsWithFormattedPrices = response.products.map((product) => ({
          ...product,
          price: `R$ ${product.price}`,
        }));
        setProducts(productsWithFormattedPrices);
      } catch (error: any) {
        console.error('Erro ao buscar produtos:', error);
        setError(`Erro ao buscar produtos. Detalhes: ${(error as Error).message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div>
        <h1>Lista de Produtos</h1>
        <Skeleton />
        <Skeleton />
        <Skeleton />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <Container>
      <Title>Lista de Produtos</Title>
      <List>
        {loading && (
          <>
            <SkeletonContainer />
            <SkeletonContainer />
            <SkeletonContainer />
          </>
        )}
        {!loading && !error && (
          <List>
            {products.map((product) => (
              <ListItem key={product.id}>
                <ProductName>{product.name}</ProductName> - <ProductPrice>{product.price}</ProductPrice>
              </ListItem>
            ))}
          </List>
        )}
      </List>
    </Container>
  );
};

export default ProductList;
