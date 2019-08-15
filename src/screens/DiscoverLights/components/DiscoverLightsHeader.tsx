import React from "react";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import { LinkProps, Link } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";
import { Header, HeaderLeft, HeaderCenter, HeaderRight } from "components/Header";
import routes from "lib/routes";

/* TODO: Remove the forwardRef when available
  The usage of React.forwardRef will no longer be required for react-router-dom v6.
  see https://github.com/ReactTraining/react-router/issues/6056
*/
const CollisionLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "innerRef" | "to">>(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  (props, ref) => <Link innerRef={ref as any} to={routes.home} {...props} />
);

const DiscoverLightsHeader = (): React.FunctionComponentElement<{}> => {
  return (
    <Header>
      <HeaderLeft>
        <IconButton edge="start" color="inherit" aria-label="back" component={CollisionLink}>
          <BackIcon />
        </IconButton>
      </HeaderLeft>
      <HeaderCenter>
        <Typography variant="h6" noWrap>
          Searching...
        </Typography>
      </HeaderCenter>
      <HeaderRight>
        <CircularProgress size={32} />
      </HeaderRight>
    </Header>
  );
};

export default DiscoverLightsHeader;
