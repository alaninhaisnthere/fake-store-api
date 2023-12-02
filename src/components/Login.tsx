
import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import Image from "next/image";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

const LogoContainer = styled.div`
  flex: 1;
  background-color: #fbd02d;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;

  @media (max-width: 768px) {
    order: 2;
  }
`;

const LogoImage = styled(Image)`
  @media (max-width: 768px) {
    width: 250px;
    height: 250px;
  }
`;

const FormContainer = styled.div`
  flex: 1;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    order: 1;
  }
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
  padding: 50px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    box-shadow: none;
  }

`;

const Title = styled.div`
  font-family: "Inter", sans-serif;
  font-weight: bold;
  font-size: 46px;
  margin-bottom: 20px;
  color: #000000;

  @media (max-width: 768px) {
    font-size: 36px;
    margin-bottom: 10px;
  }
`;

const Subtitle = styled.p`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const InputField = styled.input`
  margin-bottom: 20px;
  padding: 8px;
  border: none;
  background-color: #fbce2d5d;
  width: 100%;
  border-radius: 4px;
  font-family: "Poppins", sans-serif;
  font-weight: 300;
  font-size: 16px;
`;

const Label = styled.label`
  font-family: "Poppins", sans-serif;
  font-weight: 400;
  font-size: 16px;
  margin-bottom: 8px;
`;

const SubmitButton = styled.button`
  margin-top: 20px;
  margin-bottom: 10px;
  padding: 10px 20px;
  background-color: #1f3e82;
  font-family: "Poppins", sans-serif;
  font-weight: 700;
  color: #fff;
  border: none;
  border-radius: 23px;
  cursor: pointer;
  align-self: center;
  width: 150px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

interface LoginProps {
  onLogin: (email: string, password: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <LoginContainer>
      <FormContainer>
        <LoginForm onSubmit={handleSubmit}>
          <Subtitle>Welcome back!</Subtitle>
          <Title>Sign in</Title>
          <Label htmlFor="email">Email</Label>
          <InputField
            type="email"
            id="email"
            placeholder="user@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Label htmlFor="password">Password</Label>
          <InputField
            type="password"
            id="password"
            placeholder="***********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">LOGIN</SubmitButton>
        </LoginForm>
      </FormContainer>
      <LogoContainer>
        <LogoImage src={Logo} alt="Logo" width={400} height={400} />
      </LogoContainer>
    </LoginContainer>
  );
};

export default Login;