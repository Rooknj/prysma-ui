import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import client from "./apolloClient";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Main from "./pages/main";
import About from "./pages/about";

const theme = createMuiTheme();

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline>
              <div>
                <nav>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="/about/">About</Link>
                    </li>
                  </ul>
                </nav>

                <Route path="/" exact component={Main} />
                <Route path="/about/" component={About} />
              </div>
            </CssBaseline>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
