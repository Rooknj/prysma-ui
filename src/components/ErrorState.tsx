import React from "react";
import ErrorIcon from "@material-ui/icons/SentimentVeryDissatisfied";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import Button from "@material-ui/core/Button";

const ErrorContainer = styled.div`
  text-align: center;
  height: fit-content;
`;

const StyledErrorIcon = styled(ErrorIcon)`
  font-size: 10rem;
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const PrimaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const SecondaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const ActionButton = styled(Button)`
  border-radius: 24px;
`;

export interface ErrorStateProps {
  onRefresh?: () => void;
}

const ErrorState = (props: ErrorStateProps): React.FunctionComponentElement<ErrorStateProps> => {
  const { onRefresh } = props;
  return (
    <ErrorContainer>
      <StyledErrorIcon />
      <PrimaryText variant="h5" color="textPrimary">
        Uh Oh!
      </PrimaryText>
      <SecondaryText variant="body2" color="textSecondary">
        Something Went Wrong
      </SecondaryText>
      <ActionButton variant="contained" color="primary" size="large" onClick={onRefresh}>
        Refresh
      </ActionButton>
    </ErrorContainer>
  );
};

export default ErrorState;
