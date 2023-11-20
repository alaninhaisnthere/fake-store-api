import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getProducts } from "../api/api";
import { styled } from "styled-components";

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  image: string;
  category: string;
}

const ContentContainer = styled.div`
  padding-top: 100px;
`;

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredProducts = activeCategory
    ? products.filter(
        (product) =>
          product.category.toLowerCase() === activeCategory.toLowerCase()
      )
    : products;

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <ContentContainer>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "22px",
          justifyContent: "center",
          margin: "auto",
          maxWidth: "1110px",
        }}
      >
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} isLoading={false} />
        ))}
      </div>
    </ContentContainer>
  );
};

export default ProductList;
