import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

const StyledToolbar = styled(Toolbar)`
  align-items: center;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  grid-template-areas: "left center right";
`;

export const HeaderLeft = styled.div`
  grid-area: left;
  display: flex;
  justify-content: flex-start;
`;

export const HeaderCenter = styled.div`
  grid-area: center;
  display: flex;
  justify-content: center;
`;

export const HeaderRight = styled.div`
  grid-area: right;
  display: flex;
  justify-content: flex-end;
`;

export interface HeaderProps {
  children: React.ReactNode | React.ReactNode[];
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
