import { useEffect, useState } from 'react';
import { getProducts } from '../api/api';

interface Product {
  id: number;
  name: string;
  price: number;
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
        if (response.products && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          setError('Resposta da API não contém uma propriedade "products" que é um array.');
        }
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
          <strong>{product.name}</strong> - R${typeof product.price === 'number' ? product.price.toFixed(2) : 'Preço inválido'}
          {/* Adicione outras informações do produto conforme necessário */}
        </li>
      ))}
    </ul>
  </div>
  );
};

export default ProductList;
