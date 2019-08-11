import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import { ThemeProvider } from "styled-components";
import { ThemeProvider as MuiThemeProvider, StylesProvider } from "@material-ui/styles";
import { CssBaseline } from "@material-ui/core";
import { client } from "lib/apollo";
import NotFound from "screens/NotFound";
import Light from "screens/Light";
import AddLight from "screens/AddLight";
import About from "screens/About";
import Home from "screens/Home";
import theme from "./theme";
import { GlobalStyle } from "./GlobalStyle";

const App = (): React.FunctionComponentElement<{}> => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <MuiThemeProvider theme={theme}>
          <Router>
            <CssBaseline />
            <GlobalStyle />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about/" exact component={About} />
              <Route path="/addLight/" exact component={AddLight} />
              <Route path="/light/:id" exact component={Light} />
              <Route component={NotFound} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);
export default App;
