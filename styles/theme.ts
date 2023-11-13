import { createGlobalStyle } from 'styled-components';

export const resetStyles = createGlobalStyle`
  html,
  body,
  #root {
    height: 100%;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Arial', sans-serif; /* Escolha a fonte desejada */
  }
`;
