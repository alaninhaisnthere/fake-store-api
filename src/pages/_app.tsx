import React, { useState, useEffect } from 'react';
import { AppProps } from 'next/app';
import Navbar from '../components/Navbar';
import Login from '../components/Login';
import { getAllUsers } from '../api/api';
import { Helmet } from 'react-helmet';
import GlobalStyles from '../components/GlobalStyles';
import { Product } from '../types/types';
import { CartProvider } from '../context/CartContext';

interface MyAppProps extends AppProps {
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}

function MyApp({ Component, pageProps, cartItems, setCartItems }: MyAppProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = async (email: string, password: string) => {
    try {
      const users = await getAllUsers();
      const authenticatedUser = users.find(
        (user: { email: string; password: string }) =>
          user.email === email && user.password === password
      );

      if (authenticatedUser) {
        setIsLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        // const response = await fetch(`https://fakestoreapi.com/carts/user/${authenticatedUser.id}`);
        // const userCart = await response.json();

      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
  };

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <CartProvider cartItems={cartItems} setCartItems={setCartItems}>
      <>
        <Helmet>
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
            rel="stylesheet"
          />
        </Helmet>
        {isLoggedIn && (
          <Navbar
            categories={[
              'electronics',
              'jewelry',
              "men's clothing",
              "women's clothing",
            ]}
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            onLogout={handleLogout}
            cartItems={cartItems}
          />
        )}
        {isLoggedIn && <Component {...pageProps} />}
        {!isLoggedIn && <Login onLogin={handleLogin} />}
        <GlobalStyles />
      </>
    </CartProvider>
  );
}

export default MyApp;
