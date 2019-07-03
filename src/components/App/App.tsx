import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { client } from "lib/apollo";

const theme = createMuiTheme();

const App = (): JSX.Element => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline>
          <div>hello world!</div>
        </CssBaseline>
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);

export default App;
