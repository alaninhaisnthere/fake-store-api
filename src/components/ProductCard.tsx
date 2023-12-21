import React from "react";
import styled, { keyframes } from "styled-components";
import { Product } from "../types/types";
import { useCart } from '../context/CartContext';

interface CardContainerProps {
  isLoading?: boolean;
}

const CardContainer = styled.div<CardContainerProps>`
  width: auto;
  height: auto;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  margin: 20px;

  @media (max-width: 768px) {
    max-width: 100%;
    margin-bottom: 20px;
  }
`;

const ImageContainer = styled.div`
  width: 200px;
  height: 200px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Image = styled.img`
  max-height: 160px;
  transition: transform 0.3s ease-in-out;

  ${ImageContainer}:hover & {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    max-height: 100px
  }
`;

const ProductInfo = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: normal;
  margin-bottom: 8px;
  font-family: "Montserrat", sans-serif;
`;

const PriceWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const Price = styled.span`
  font-size: 15px;
  font-weight: bold;
  color: #373737;
  font-family: "Montserrat", sans-serif;
`;

const Description = styled.p`
  font-size: 12px;
  color: #777;
  margin-bottom: 16px;
  font-family: "Montserrat", sans-serif;
`;

const BottomSection = styled.div`
  background-color: #1f3e82;
  height: 32px;
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    background-color: #f47458;
  }

  @media (max-width: 768px) {
    height: 50px;
  }
`;

const BuyButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  font-family: "Montserrat", sans-serif;
`;

interface ProductCardProps {
  isLoading?: boolean;
  product?: Product;
  cartItems: Product[];
  setCartItems: React.Dispatch<React.SetStateAction<Product[]>>;
}


const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

const ProductCard: React.FC<ProductCardProps> = ({
  isLoading = false,
  product
}) => {

  const { cartItems, setCartItems } = useCart();

  const truncatedTitle = product ? truncateText(product.title, 25) : "";
  const truncatedDescription = product
    ? truncateText(product.description || "", 50)
    : "Loading...";

  const handleAddToCart = () => {
    // console.log("Adding to cart:", product);
    if (product) {
      setCartItems((prevItems) => [...prevItems, product]);
    }
  };

  const formattedPrice = isLoading
    ? "Loading..."
    : product
      ? `R$ ${(product.price as unknown as number).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`
      : "";

  return (
    <CardContainer isLoading={isLoading}>
      <ImageContainer>
        <Image src={product?.image} alt={truncatedTitle} />
      </ImageContainer>
      <ProductInfo>
        <Name>{isLoading ? "Loading..." : truncatedTitle}</Name>
        <PriceWrapper>
          <Price>{formattedPrice}</Price>
        </PriceWrapper>
        <Description>
          {isLoading ? "Loading..." : truncatedDescription}
        </Description>
      </ProductInfo>
      <BottomSection>
        <BuyButton onClick={handleAddToCart}>Add to cart +</BuyButton>
      </BottomSection>
    </CardContainer>
  );
};

export default ProductCard;