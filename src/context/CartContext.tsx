import React, { createContext, useContext, useState, ReactNode, useEffect, SetStateAction, Dispatch } from 'react';
import { Product } from '../types/types';

interface CartContextProps {
  cartItems: Product[];
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
  cartItems: Product[];
  setCartItems: Dispatch<SetStateAction<Product[]>>;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children, cartItems: initialCartItems, setCartItems }) => {
  const [localCartItems, setLocalCartItems] = useState<Product[]>(initialCartItems);

  useEffect(() => {
    setLocalCartItems(initialCartItems);
  }, [initialCartItems]);

  return (
    <CartContext.Provider value={{ cartItems: localCartItems, setCartItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must within a CartProvider');
  }
  return context;
};
