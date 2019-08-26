import React from "react";
import { Typography, Button } from "@material-ui/core";
import { LinkProps, Link } from "react-router-dom";
import { Header, HeaderCenter, HeaderRight } from "components/Header";
import routes from "lib/routes";
import styled from "styled-components";

/* TODO: Remove the forwardRef when available
  The usage of React.forwardRef will no longer be required for react-router-dom v6.
  see https://github.com/ReactTraining/react-router/issues/6056
*/
const CollisionLink = React.forwardRef<HTMLAnchorElement, Omit<LinkProps, "innerRef" | "to">>(
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/no-explicit-any
  (props, ref) => <Link innerRef={ref as any} to={routes.home} {...props} />
);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkipButton = styled(Button)<{ component: any }>`
  text-transform: none;
  font-weight: normal;
`;

const SetupLightHeader = (): React.FunctionComponentElement<{}> => {
  return (
    <Header>
      <HeaderCenter>
        <Typography variant="h6" noWrap>
          Light Setup
        </Typography>
      </HeaderCenter>
      <HeaderRight>
        <SkipButton color="inherit" aria-label="skip" component={CollisionLink}>
          Skip
        </SkipButton>
      </HeaderRight>
    </Header>
  );
};

export default SetupLightHeader;
