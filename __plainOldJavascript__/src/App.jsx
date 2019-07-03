import React from "react";
import { ApolloProvider } from "react-apollo-hooks"; // Connect Apollo to React
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import client from "./apolloClient";
import MainPage from "./pages/main";
import AboutPage from "./pages/about";
import AddLightPage from "./pages/addLight";
import LightPage from "./pages/light";
import NotFoundPage from "./pages/notFound";

const theme = createMuiTheme();

const App = () => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline>
            <AppBar position="static">
              <Tabs>
                <Tab label="Home" component={Link} to="/" />
                <Tab label="Add Light" component={Link} to="/addLight/" />
                <Tab label="About" component={Link} to="/about/" />
              </Tabs>
            </AppBar>
            <Switch>
              {/* The switch uses the first route that matches instead of using multiple */}
              <Route path="/" exact component={MainPage} />
              <Route path="/about/" exact component={AboutPage} />
              <Route path="/addLight/" exact component={AddLightPage} />
              <Route path="/light/:id" exact component={LightPage} />
              <Route component={NotFoundPage} />
            </Switch>
            {/* Put any modals/things that can show up over pages that you want routed outside the switch */}
          </CssBaseline>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);

export default App;