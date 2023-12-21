import React, { useEffect } from 'react';
import CartPage from '../components/CartPage';
import { Product } from '../types/types';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CartContainer = styled.div`
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

const Cart: React.FC = () => {
  const { cartItems, setCartItems } = useCart();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userId = 2;
        const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
        const userCart = await response.json();

        const getProducts = await fetch(`https://fakestoreapi.com/products`)
        const allProducts = await getProducts.json();

        const ids = userCart[0].products.map(item => item.productId);

        const cart: [] = []
        ids.forEach(id => {
          cart.push(allProducts.find(item => item.id === id))
        })

        setCartItems(cart)
      } catch (error) {
        console.error('Error fetching user cart:', error);
      }
    };

    fetchUserCart();
  }, [setCartItems]);

  return (
    <CartContainer>
      <CartPage cartItems={cartItems || []} />
    </CartContainer>
  );
};

export default Cart;
