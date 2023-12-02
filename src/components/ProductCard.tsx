import React from "react";
import styled, { keyframes } from "styled-components";

interface CardContainerProps {
  isLoading?: boolean;
}

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`;

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

const Image = styled.div`
  width: 100%;
  height: 0;
  padding-top: 75%;
  background-color: #ccc;
  border-radius: 8px;
  background-size: cover;
  background-position: top;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ProductInfo = styled.div`
  padding: 16px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Name = styled.h3`
  font-size: 16px;
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
  font-size: 10px;
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
    background-color: #F47458;
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
  product?: {
    id: number;
    title: string;
    price: string;
    description: string;
    image: string;
  };
}

const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

const ProductCard: React.FC<ProductCardProps> = ({
  isLoading = false,
  product,
}) => {
  const truncatedTitle = product ? truncateText(product.title, 25) : "";
  const productDescription = product?.description || "Loading...";

  return (
    <CardContainer isLoading={isLoading}>
      <Image style={{ backgroundImage: `url(${product?.image})` }} />
      <ProductInfo>
        <Name>{isLoading ? "Loading..." : truncatedTitle}</Name>
        <PriceWrapper>
          <Price>{isLoading ? "Loading..." : `R$ ${product?.price}`}</Price>
        </PriceWrapper>
        <Description>
          {isLoading ? "Loading..." : productDescription}
        </Description>
      </ProductInfo>
      <BottomSection>
        <BuyButton>Buy it!</BuyButton>
      </BottomSection>
    </CardContainer>
  );
};

export default ProductCard;
