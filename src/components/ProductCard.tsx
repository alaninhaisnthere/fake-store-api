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
  width: 300px;
  margin: 16px;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  opacity: ${(props) => (props.isLoading ? 0.5 : 1)};
`;

const Image = styled.div`
  width: 100%;
  height: 150px;
  background-color: #ccc;
  margin-bottom: 16px;
  border-radius: 8px;
  animation: ${shimmer} 2s infinite linear;
`;

const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const Name = styled.h3`
  font-size: 18px;
  font-weight: bold;
`;

const PriceWrapper = styled.div`
  background-color: #373737;
  color: #fff;
  padding: 4px 8px;
  border-radius: 8px;
`;

const Price = styled.span`
  font-size: 14px;
`;

const Description = styled.p`
  font-size: 12px;
  color: #777;
`;

const BuyButton = styled.button`
  background-color: #0f52ba;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 0 0 8px 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

interface ProductCardProps {
  isLoading?: boolean;
  product?: {
    id: number;
    name: string;
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
        <Name>{isLoading ? 'Loading...' : product?.name}</Name>
        <PriceWrapper>
          <Price>{isLoading ? 'Loading...' : `R$ ${parseFloat(product?.price || '0').toFixed(2)}`}</Price>
        </PriceWrapper>
      </ProductInfo>
      <Description>{isLoading ? 'Loading...' : 'Redesigned from scratch and completely revised.'}</Description>
      <BuyButton>
        Comprar
      </BuyButton>
    </CardContainer>
  );
};

export default ProductCard;
