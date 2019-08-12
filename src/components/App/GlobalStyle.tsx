/* eslint @typescript-eslint/explicit-function-return-type:0 */
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    height: 100%;
  }

  body {
    height: 100%;
    @media print {
      background-color: ${props => props.theme.palette.common.white};
      color: ${props => props.theme.palette.common.black};
    }
  }

  #root {
    height: 100%;
  }
`;
