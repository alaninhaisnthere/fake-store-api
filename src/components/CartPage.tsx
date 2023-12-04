import React from "react";
import { Product } from "../types/types";

interface CartPageProps {
  cartItems: Product[];
}

const CartPage: React.FC<CartPageProps> = ({ cartItems }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.title} - {item.price}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CartPage;
