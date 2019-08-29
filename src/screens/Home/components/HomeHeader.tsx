import React from "react";
import styled from "styled-components";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AddIcon from "@material-ui/icons/Add";
import prysmaLogo from "assets/images/prysma-logo.svg";
import { LinkProps, Link } from "react-router-dom";
import { Header, HeaderCenter, HeaderRight, HeaderLeft } from "components/Header";
import routes from "lib/routes";

const StyledImg = styled.img`
  height: 32px;
`;

/* TODO: Remove the forwardRef when available
  The usage of React.forwardRef will no longer be required for react-router-dom v6.
  see https://github.com/ReactTraining/react-router/issues/6056
*/
const CollisionLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "innerRef" | "to">>(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  (props, ref) => <Link innerRef={ref as any} to={routes.discoverLights} {...props} />
);

const HomeHeader = (): React.FunctionComponentElement<{}> => {
  return (
    <Header>
      <HeaderLeft>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
      </HeaderLeft>
      <HeaderCenter>
        <StyledImg src={prysmaLogo} alt="Prysma Logo" onClick={() => window.location.reload()} />
      </HeaderCenter>
      <HeaderRight>
        <IconButton edge="end" color="inherit" aria-label="add light" component={CollisionLink}>
          <AddIcon />
        </IconButton>
      </HeaderRight>
    </Header>
  );
};

export default HomeHeader;
