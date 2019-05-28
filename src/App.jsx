import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import client from "./apolloClient";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import Main from "./main";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <CssBaseline>
          <Main />
        </CssBaseline>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
