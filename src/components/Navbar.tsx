import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.div`
  background-color: #0f52ba;
  color: #fff;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: fixed;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.h1`
  font-size: 24px;
  margin-right: 20px;
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;
`;

const SearchInput = styled.input`
  padding: 10px;
  margin-right: 10px;
  border: none;
  border-radius: 4px;
`;

const CartButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
`;

const CategoriesToggle = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-right: 20px;
`;

const CategoriesContainer = styled.div<{ showCategories: boolean }>`
  display: ${(props) => (props.showCategories ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
`;

const CategoryLink = styled.a`
  color: #fff;
  text-decoration: none;
  margin-top: 5px;
  font-size: 16px;

  &:hover {
    text-decoration: underline;
  }
`;

interface NavbarProps {
  categories: string[];
}

const Navbar: React.FC<NavbarProps> = ({ categories }) => {
  const [showCategories, setShowCategories] = useState(false);

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  return (
    <NavbarContainer>
      <Logo>FakeStore</Logo>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search products..." />
        <CartButton>
          <FaShoppingCart />
        </CartButton>
      </SearchContainer>
      <CategoriesToggle onClick={toggleCategories}>
        {showCategories ? <FaTimes /> : <FaBars />}
      </CategoriesToggle>
      <CategoriesContainer showCategories={showCategories}>
        {categories.map((category) => (
          <CategoryLink key={category} href={`#${category}`}>
            {category}
          </CategoryLink>
        ))}
      </CategoriesContainer>
    </NavbarContainer>
  );
};

export default Navbar;