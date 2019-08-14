/* eslint @typescript-eslint/explicit-function-return-type:0 */
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    /* Make everything border-box sized by default so no strange styling effects pop up */
    box-sizing: border-box;
  }

  html {
    /* Make sure the HTML document takes up 100% of the visible space */
    height: 100%;
  }

  body {
    /* Make sure the body takes up 100% of the visible space */
    height: 100%;
    /* Set print colors to white to save on printer ink */
    @media print {
      background-color: ${props => props.theme.palette.common.white};
      color: ${props => props.theme.palette.common.black};
    }
  }

  #root {
    /* Make sure the root react div takes up 100% of the visible space */
    height: 100%;
  }
`;
