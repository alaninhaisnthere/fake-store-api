import React, { useEffect, useState } from 'react';
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
  const [cartItems, setCartItems] = useState();

  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userId = 1;
        const response = await fetch(`https://fakestoreapi.com/carts/user/${userId}`);
        const userCart = await response.json();
        console.log(userCart)
        setCartItems(userCart[0].products);
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
