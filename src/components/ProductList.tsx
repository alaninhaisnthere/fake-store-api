import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

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
        const numberFormatter = new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });
        const productsWithFormattedPrices = response.products.map((product) => ({
          ...product,
          price: numberFormatter.format(parseFloat(product.price)),
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
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Lista de Produtos</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <strong>{product.name}</strong> - {product.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
