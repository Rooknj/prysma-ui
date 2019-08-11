import React from "react";
import styled from "styled-components";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import prysmaLogo from "assets/images/prysma-logo.svg";

const StyledImg = styled.img`
  height: 32px;
`;

const StyledToolbar = styled(Toolbar)`
  justify-content: space-between;
  align-items: center;
`;

const HomeAppBar = (): React.FunctionComponentElement<{}> => {
  return (
    <AppBar position="static" color="default">
      <StyledToolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <StyledImg src={prysmaLogo} alt="Prysma Logo" />
        <IconButton edge="end" color="inherit" aria-label="menu">
          <AddIcon />
        </IconButton>
      </StyledToolbar>
    </AppBar>
  );
};

export default HomeAppBar;
