import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import client from "./apolloClient";
import CssBaseline from "@material-ui/core/CssBaseline";
import Main from "./main";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CssBaseline>
        <Main />
      </CssBaseline>
    </ApolloProvider>
  );
};

export default App;
