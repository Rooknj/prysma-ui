import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import DisconnectedIcon from "@material-ui/icons/PowerOffOutlined";
import ZeroState from "components/ZeroState";

const StyledDisconnectedIcon = styled(DisconnectedIcon)`
  font-size: 10rem;
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const PrimaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const SecondaryText = styled(Typography)`
  margin-bottom: ${(props): number => props.theme.spacing(2)}px;
`;

const DisconnectedState = (): React.FunctionComponentElement<{}> => {
  return (
    <ZeroState>
      <StyledDisconnectedIcon />
      <PrimaryText variant="h5" color="textPrimary">
        Disconnected
      </PrimaryText>
      <SecondaryText variant="body2" color="textSecondary">
        Make sure the light is turned on and connected to WiFi
      </SecondaryText>
    </ZeroState>
  );
};

export default DisconnectedState;
