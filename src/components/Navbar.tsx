import React, { useState } from 'react';
import styled from 'styled-components';
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';

const NavbarContainer = styled.div`
  position: fixed;
  background-color: #FA997D;
  color: #fff;
  padding: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  margin-right: auto;
  margin-left: 20px;
  flex: 1;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: none;
  border-radius: 4px;
`;

const CartButton = styled.button`
  background-color: transparent;
  color: #fff;
  border: none;
  cursor: pointer;
  font-size: 24px;
  margin-left: 20px;
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
  position: absolute;
  top: 100%;
  display: ${(props) => (props.showCategories ? 'flex' : 'none')};
  flex-direction: column;
  align-items: flex-end;
  margin-top: 10px;
  right: 40px;
  width: max-content;
`;

const CategoryLink = styled.a`
  color: #000000;
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