import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import client from "./apolloClient";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MainPage from "./pages/main";
import AboutPage from "./pages/about";
import AddLightPage from "./pages/addLight";

const theme = createMuiTheme();

// const ROUTES = [
//   { route: "/", component: MainPage },
//   { route: "/about/", component: AboutPage },
//   { route: "/addLight/", component: AddLightPage }
// ];

const App = () => {
  return (
    <ApolloProvider client={client}>
      <StylesProvider injectFirst>
        <ThemeProvider theme={theme}>
          <Router>
            <CssBaseline>
              <AppBar position="static">
                <Tabs>
                  <Tab label="Home" component={Link} exact to="/" />
                  <Tab label="Add Light" component={Link} to="/addLight/" />
                  <Tab label="About" component={Link} to="/about/" />
                </Tabs>
              </AppBar>
              <div>
                <Route path="/" exact component={MainPage} />
                <Route path="/about/" component={AboutPage} />
                <Route path="/addLight/" component={AddLightPage} />
              </div>
            </CssBaseline>
          </Router>
        </ThemeProvider>
      </StylesProvider>
    </ApolloProvider>
  );
};

export default App;
