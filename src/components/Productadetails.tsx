import React from "react";
import { useParams } from "react-router-dom";
import { Product } from "../types/types";

interface ProductDetailsProps {
  products: Product[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ products }) => {
  const { productId } = useParams<{ productId: string }>();
  const product = products.find((p) => p.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </div>
  );
};

export default ProductDetails;
