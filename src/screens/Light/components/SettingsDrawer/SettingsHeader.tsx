import React from "react";
import { Typography, Button } from "@material-ui/core";
import { Header, HeaderCenter, HeaderRight } from "components/Header";
import styled from "styled-components";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SkipButton = styled(Button)`
  text-transform: none;
  font-weight: normal;
`;

export interface SettingsHeaderProps {
  onClose: () => void;
}

const SettingsHeader = (
  props: SettingsHeaderProps
): React.FunctionComponentElement<SettingsHeaderProps> => {
  const { onClose } = props;
  return (
    <Header>
      <HeaderCenter>
        <Typography variant="h6" noWrap>
          Light Settings
        </Typography>
      </HeaderCenter>
      <HeaderRight>
        <SkipButton color="inherit" aria-label="skip" onClick={onClose}>
          Done
        </SkipButton>
      </HeaderRight>
    </Header>
  );
};

export default SettingsHeader;
