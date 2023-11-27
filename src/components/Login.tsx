import React, { useState } from "react";
import styled from "styled-components";
import Logo from "../assets/logo.svg"
import Image from "next/image";

const LoginContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const LeftSection = styled.div`
  flex: 0.6;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const RightSection = styled.div`
  flex: 0.4;
  background-color: #fbd02d;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 60%;
  padding: 20px;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  font-family: 'inter', sans-serif;
  font-weight: bold;
  font-size: 56px;
  margin-bottom: 20px;
  color: #1F3E82;
`;

const Subtitle = styled.p`
  font-family: 'Poppins', sans-serif;
  font-weight: 400;
  font-size: 16px;
  color: rgba(0, 0, 0, 0.5);
  margin-bottom: 20px;
`;

const InputField = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SubmitButton = styled.button`
  padding: 10px;
  background-color: #1F3E82;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
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
      <LeftSection>
        <LoginForm onSubmit={handleSubmit}>
          <Title>Sign in</Title>
          <Subtitle>Welcome back!</Subtitle>
          <InputField
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <SubmitButton type="submit">Login</SubmitButton>
        </LoginForm>
      </LeftSection>
      <RightSection>
        <Image src={Logo} alt="Logo" />
      </RightSection>
    </LoginContainer>
  );
};

export default Login;
