import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../assets/logo.svg";

const NavbarContainer = styled.div`
  position: fixed;
  background-color: #fbd02d;
  color: #000000;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1000;
`;

const Logo = styled.div`
  height: 40px;
  cursor: pointer;
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
  display: ${(props) => (props.showCategories ? "flex" : "none")};
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
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  onLogout,
  ...props
}) => {
  const [showCategories, setShowCategories] = useState(false);
  const router = useRouter();

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category);
    setShowCategories(false);
    router.push(`/?category=${encodeURIComponent(category)}`, undefined, {
      shallow: true,
    });
  };

  const handleLogoClick = () => {
    setActiveCategory(null);
    router.push("/", undefined, { shallow: true });
  };

  console.log(categories);

  return (
    <NavbarContainer>
      <Logo>
        <Image width={95} src={LogoImage} alt="Logo" />
      </Logo>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search products..." />
        <CartButton>
          <FaShoppingCart />
        </CartButton>{" "}
      </SearchContainer>
      <CategoriesToggle onClick={toggleCategories}>
        {showCategories ? <FaTimes /> : <FaBars />}
      </CategoriesToggle>
      <CategoriesContainer showCategories={showCategories}>
        {categories.map((category) => (
          <CategoryLink
            key={category}
            href={`#${category}`}
            onClick={() => handleCategoryClick(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
          </CategoryLink>
        ))}
        {onLogout && <CategoryLink onClick={onLogout}>Logout</CategoryLink>}
      </CategoriesContainer>
    </NavbarContainer>
  );
};

export default Navbar;
