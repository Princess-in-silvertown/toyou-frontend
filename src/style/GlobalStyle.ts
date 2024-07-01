import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Gothic_Goding';
    src: url('./assets/fonts/Gothic_Goding.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  body {
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  input {
    padding: 0;
    border: 1px solid black;
    border-radius: 3px;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  button {
    background: inherit;
    border: none;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
    overflow: visible;
    cursor: pointer;
  }

  .App {
    margin: none;
  }

  ul,
  li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;

export default GlobalStyle;
