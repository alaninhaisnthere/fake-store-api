import React from "react";
import CartPage from "../components/CartPage";
import { Product } from "../types/types";
import styled from "styled-components";

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

const Cart = ({ cartItems }: { cartItems: Product[] }) => {
  return
  <CartContainer>
  <CartPage cartItems={cartItems} />;
  </CartContainer>
};

export default Cart;
