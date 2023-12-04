import React, { useState } from 'react';
import ProductList from '../components/ProductList';
import ProductCard from '../components/ProductCard';
import { Product } from '../types/types';

const Index: React.FC = () => {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  return (
    <div>
      <ProductList cartItems={cartItems} setCartItems={setCartItems} />
    </div>
  );
};

export default Index;
