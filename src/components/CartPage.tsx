import React from "react";
import { Product } from "../types/types";

interface CartPageProps {
  cartItems: Product[];
}

const CartPage: React.FC<CartPageProps> = ({ cartItems }) => {
  // console.log("cartItems:", cartItems);

  if (!cartItems || cartItems.length === 0) {
    return <div>Empty cart</div>;
  }

  const produtos = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products/`)
      const cartProducts = await response.json()
      console.log(cartProducts)
    } catch (e) {
      console.log('deu merda', e)
    }
  }
  produtos()

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
