import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import client from "./apolloClient";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import Main from "./main";

const theme = createMuiTheme();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <CssBaseline>
            <Main />
          </CssBaseline>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
