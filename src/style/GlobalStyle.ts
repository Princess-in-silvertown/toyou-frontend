import './Font.css';
import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Pretendard-Regular';
    font-display: var(100) ;
    margin: 0;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overscroll-behavior-y: contain;
    overflow-x: hidden;
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

  input {
    -webkit-appearance: none;
       -moz-appearance: none;
            appearance: none;
    
    border: none;
    &:focus{
      outline: none
    }
  }
`;

export default GlobalStyle;
