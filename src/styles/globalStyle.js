import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  :root {
    --line: 1px solid var(--color-grey-light-2);
  }

  * {
    margin: 0;
    padding: 0;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  html {
    box-sizing: border-box;
    font-size: 62.5%;
  }
  
  @media only screen and (max-width: 68.75em) {
    html {
      font-size: 50%; 
    } 
  }

  body {
    font-family: 'Open Sans', sans-serif;
    font-size: 1.8rem;
    font-weight: normal;
    line-height: 1.4em;
    color: var(--color-primary);
    background: #fafafa;
    min-height: 100vh; 
  }

  @media only screen and (max-width: 75em) {
    .container {
      margin: 0;
      max-width: 100%; 
    } 
  }

  h1, h2, h3, h4, nav {
    font-family: 'Coda', sans-serif;
    color: var(--color-primary-dark);
    line-height: 1.2em;
    -webkit-font-smoothing: antialiased;
    font-weight: normal;
  }

  h2 {
    font-size: 1.5em;
  }

`;
