import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import styled from "styled-components";
import EmptyIcon from "mdi-material-ui/LightbulbOffOutline";
import { Link as RouterLink } from "react-router-dom";

const EmptyStateContainer = styled.div`
  text-align: center;
  height: fit-content;
`;

const StyledEmptyIcon = styled(EmptyIcon)`
  font-size: 10rem;
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const PrimaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const EmptyState = (): React.FunctionComponentElement<{}> => {
  return (
    <EmptyStateContainer>
      <StyledEmptyIcon />
      <PrimaryText variant="h5" color="textPrimary">
        No Lights Added
      </PrimaryText>
      <Link component={RouterLink} variant="subtitle1" to="/addLight">
        Connect a Light
      </Link>
    </EmptyStateContainer>
  );
};

export default EmptyState;
