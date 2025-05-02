import { createGlobalStyle } from 'styled-components';
import '@fontsource/poppins'; // Automatically imports Poppins

const GlobalStyle = createGlobalStyle`
  * {
    font-family: 'Poppins', sans-serif;
  }
`;

export default GlobalStyle;
