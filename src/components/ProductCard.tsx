import React from 'react';
import styled, { keyframes } from 'styled-components';

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
  width: 218px;
  height: 285px;
  background-color: #fff;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1); /* Adicionando box-shadow */
`;

const Image = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ccc;
  border-radius: 8px;
  animation: ${shimmer} 2s infinite linear;
`;

const ProductInfo = styled.div`
  padding: 16px;
`;

const Name = styled.h3`
  font-size: 16px;
  font-weight: normal;
  margin-bottom: 8px;
  font-family: 'Montserrat', sans-serif;
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
  font-family: 'Montserrat', sans-serif;
`;

const Description = styled.p`
  font-size: 10px;
  color: #777;
  margin-bottom: 16px;
  font-family: 'Montserrat', sans-serif;
`;

const BottomSection = styled.div`
  background-color: #0f52ba;
  height: 32px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const BuyButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 14px;
  font-family: 'Montserrat', sans-serif;
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

const ProductCard: React.FC<ProductCardProps> = ({ isLoading = false, product }) => {
  return (
    <CardContainer isLoading={isLoading}>
      <Image />
      <ProductInfo>
        <Name>{isLoading ? 'Loading...' : product?.title}</Name>
        <PriceWrapper>
          <Price>{isLoading ? 'Loading...' : `R$ ${product?.price}`}</Price>
        </PriceWrapper>
        <Description>{isLoading ? 'Loading...' : 'Redesigned from scratch and completely revised.'}</Description>
      </ProductInfo>
      <BottomSection>
        <BuyButton>Comprar</BuyButton>
      </BottomSection>
    </CardContainer>
  );
};

export default ProductCard;