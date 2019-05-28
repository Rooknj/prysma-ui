import React from "react";
import { ApolloProvider } from "react-apollo"; // Connect Apollo to React
import client from "./apolloClient";

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>Hello Prysma!</div>
    </ApolloProvider>
  );
};

export default App;
