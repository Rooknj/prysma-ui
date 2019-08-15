import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  align-items: center;
`;

export interface HeaderProps {
  children: React.ReactNode[];
}

const Header = (props: HeaderProps): React.FunctionComponentElement<HeaderProps> => {
  const { children } = props;
  return (
    <AppBar position="static" color="default">
      <StyledToolbar>{children}</StyledToolbar>
    </AppBar>
  );
};

export default Header;
