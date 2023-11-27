import React, { useState, useEffect } from "react";
import { AppProps } from "next/app";
import Navbar from "../components/Navbar";
import Login from "../components/Login";
import { getAllUsers } from "../api/api";

import GlobalStyles from "../components/GlobalStyles";

function MyApp({ Component, pageProps }: AppProps) {
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
        localStorage.setItem("isLoggedIn", "true");
      } else {
        alert("Credenciais inválidas");
      }
    } catch (error) {
      console.error("Erro ao fazer login:", error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedIn");
  };

  useEffect(() => {
    const userIsLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <>
      {isLoggedIn && (
        <Navbar
          categories={[
            "electronics",
            "jewelry",
            "men's clothing",
            "women's clothing",
          ]}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          onLogout={handleLogout}
        />
      )}
      {isLoggedIn && <Component {...pageProps} />}
      {!isLoggedIn && <Login onLogin={handleLogin} />}
      <GlobalStyles />
    </>
  );
}

export default MyApp;
