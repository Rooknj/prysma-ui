import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styled from "styled-components";
import EmptyIcon from "mdi-material-ui/LightbulbOffOutline";
import { Link as RouterLink } from "react-router-dom";
import ZeroState from "components/ZeroState";
import routes from "lib/routes";

const StyledEmptyIcon = styled(EmptyIcon)`
  font-size: 10rem;
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const PrimaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const EmptyState = (): React.FunctionComponentElement<{}> => {
  return (
    <ZeroState>
      <StyledEmptyIcon />
      <PrimaryText variant="h5" color="textPrimary">
        No Lights Added
      </PrimaryText>
      <Link component={RouterLink} variant="subtitle1" to={routes.discoverLights}>
        Connect a Light
      </Link>
    </ZeroState>
  );
};

export default EmptyState;
