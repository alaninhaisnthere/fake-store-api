import React from "react";
import { Product } from "../types/types";

interface CartPageProps {
  cartItems: Product[];
}

const CartPage: React.FC<CartPageProps> = ({ cartItems }) => {
  return (
    <div>
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
