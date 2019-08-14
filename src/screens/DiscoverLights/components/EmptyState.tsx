import React from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import WifiIcon from "@material-ui/icons/Wifi";
import ZeroState from "components/ZeroState";

const StyledEmptyIcon = styled(WifiIcon)`
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
        Connect a Light To WiFi...
      </PrimaryText>
      <Typography variant="body2" color="textSecondary">
        Go to WiFi in your device settings and search for Prysma-XXXXXXXX. Follow the instructions
        on the captive portal once connected.
      </Typography>
    </ZeroState>
  );
};

export default EmptyState;
