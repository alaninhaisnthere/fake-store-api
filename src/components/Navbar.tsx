import React, { useState } from "react";
import styled from "styled-components";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useRouter } from "next/router";
import Image from "next/image";
import LogoImage from "../assets/logo.svg";
import Link from "next/link";
import { Product } from "../types/types";

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

  @media (max-width: 768px) {
    width: 100%;
    margin: 10px 0;
    display: flex;
    align-items: center;
  }
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

  @media (max-width: 768px) {
    margin-right: 10px;
  }
`;

const CategoryLink = styled.a<{ isLogout?: boolean }>`
  color: ${(props) => (props.isLogout ? "#fff" : "#fafafafa")};
  text-decoration: none;
  margin-top: 5px;
  font-size: 16px;
  background-color: ${(props) => (props.isLogout ? "#F44E3F" : "#553E4E")};
  font-weight: bold;
  margin-right: 10px;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    text-decoration: none;
    background-color: ${(props) => (props.isLogout ? "#F47458" : "#BDB0D6")};
  }
`;

const LogoutCategoryLink = styled(CategoryLink)`
  &:hover {
    background-color: #881e06;
  }
`;

const NavbarContainer = styled.div`
  position: fixed;
  background-color: #bdb0d6;
  color: #000000;
  padding: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  z-index: 1000;
  margin-top: 0;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 10px;

    ${Logo} {
      width: 100px;
    }

    ${SearchContainer} {
      flex: 1;
      margin-left: 10px;
    }

    ${SearchInput} {
      width: 100%;
    }

    ${CartButton}, ${CategoriesToggle} {
      font-size: 24px;
      margin-left: 10px;
    }

    ${CategoriesContainer} {
      top: 60px;
      right: 10px;
      left: auto;
      width: auto;
    }
  }
`;

interface NavbarProps {
  categories: string[];
  activeCategory: string | null;
  setActiveCategory: React.Dispatch<React.SetStateAction<string | null>>;
  cartItems: Product[];
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({
  categories,
  activeCategory,
  setActiveCategory,
  cartItems,
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

  const handleCartClick = () => {
    router.push("/cart");
  };

  console.log(categories);

  return (
    <NavbarContainer>
      <Logo>
        <Link href="/">
          <Image
            width={95}
            src={LogoImage}
            alt="Logo"
            onClick={handleLogoClick}
          />
        </Link>
      </Logo>
      <SearchContainer>
        <SearchInput type="text" placeholder="Search products..." />
        <CartButton onClick={handleCartClick}>
          <FaShoppingCart />
        </CartButton>{" "}
      </SearchContainer>
      <CategoriesToggle onClick={toggleCategories}>
        {showCategories ? <FaTimes /> : <FaBars />}
      </CategoriesToggle>
      <CategoriesContainer showCategories={showCategories}>
        {categories
          .filter(
            (category) =>
              category === "men's clothing" || category === "women's clothing"
          )
          .map((category) => (
            <CategoryLink
              key={category}
              href={`#${category}`}
              onClick={() => handleCategoryClick(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}{" "}
            </CategoryLink>
          ))}
        {onLogout && (
          <LogoutCategoryLink isLogout onClick={onLogout}>
            Logout
          </LogoutCategoryLink>
        )}
      </CategoriesContainer>
    </NavbarContainer>
  );
};

export default Navbar;
