import React from "react";
import { ApolloProvider } from "@apollo/react-hooks";
import CssBaseline from "@material-ui/core/CssBaseline";
import { StylesProvider } from "@material-ui/styles";
import { ThemeProvider } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { client } from "lib/apollo";
import NotFound from "screens/NotFound";
import Light from "screens/Light";
import AddLight from "screens/AddLight";
import About from "screens/About";
import Home from "screens/Home";

const theme = createMuiTheme();

const App = (): React.FunctionComponentElement<{}> => (
  <ApolloProvider client={client}>
    <StylesProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Router>
          <CssBaseline />
          <AppBar position="static">
            <Tabs value={false}>
              <Tab label="Home" component={Link} to="/" />
              <Tab label="Add Light" component={Link} to="/addLight/" />
              <Tab label="About" component={Link} to="/about/" />
            </Tabs>
          </AppBar>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/about/" exact component={About} />
            <Route path="/addLight/" exact component={AddLight} />
            <Route path="/light/:id" exact component={Light} />
            <Route component={NotFound} />
          </Switch>
        </Router>
      </ThemeProvider>
    </StylesProvider>
  </ApolloProvider>
);
export default App;
