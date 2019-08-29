import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import { Redirect } from "react-router-dom";
import styled from "styled-components";
import { Light, useChangeOnMutation } from "generated/graphql";
import routes from "lib/routes";
import { Fab } from "@material-ui/core";
import PowerIcon from "@material-ui/icons/PowerSettingsNew";
import DisconnectedIcon from "@material-ui/icons/PowerOff";
import NavIcon from "@material-ui/icons/ChevronRight";
import { useThrottledMutation } from "lib/hooks";

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const PowerButton = styled(({ on, ...props }) => <Fab {...props} />)<{ on: boolean }>`
  height: 64px;
  width: 64px;
  margin-bottom: 8px;
  background-color: ${({ on, theme }) => (on ? theme.palette.primary.main : "#3B3B3B")};
  color: ${({ on, theme }) =>
    theme.palette.getContrastText(on ? theme.palette.primary.main : "#3B3B3B")};

  :hover {
    background-color: ${({ on, theme }) => (on ? theme.palette.primary.main : "#3B3B3B")};
  }
`;

const StyledPowerIcon = styled(PowerIcon)`
  height: 28px;
  width: 28px;
`;

const NavButton = styled(Button)`
  width: 104px;
  padding-left: 0px;
  padding-right: 0px;
  padding-top: 2px;
  padding-bottom: 2px;
  height: 36px;
  .MuiButton-label {
    display: inline-grid;
    grid-template-areas: ". text arrow";
    grid-template-columns: 12px 1fr 12px;
  }
  background-color: #2c2c2c;
  color: ${({ theme }) => theme.palette.common.white};
`;

const NavText = styled.div`
  grid-area: text;
  font-style: normal;
  font-weight: normal;
  text-transform: none;
  max-height: 32px;
  line-height: 16px;
  font-size: 12px;
  overflow: hidden;
  word-break: break-all;
`;

const StyledNavIcon = styled(NavIcon)`
  grid-area: arrow;
  margin-left: -8px;
`;

export interface HomeLightProps extends Light {}

const HomeLight = (props: HomeLightProps): React.FunctionComponentElement<HomeLightProps> => {
  const { id, on, connected, name } = props;

  const [toLight, setToLight] = useState(false);
  const [changeOn] = useChangeOnMutation();

  const throttledChangeOn = useThrottledMutation(changeOn);

  const handleNavigateToLight = (): void => setToLight(true);

  const handleToggleLight = (): void => {
    throttledChangeOn({
      variables: { id, lightData: { on: !on } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          id,
          on: !on,
        },
      },
    });
  };

  if (toLight) {
    return <Redirect push to={`${routes.light}/${id}`} />;
  }

  return (
    <StyledDiv>
      <PowerButton
        on={on}
        aria-label={name}
        disabled={!connected}
        onClick={handleToggleLight}
        disableRipple
      >
        {connected ? <StyledPowerIcon /> : <DisconnectedIcon />}
      </PowerButton>
      <NavButton variant="contained" onClick={handleNavigateToLight}>
        <NavText>{name}</NavText>
        <StyledNavIcon />
      </NavButton>
    </StyledDiv>
  );
};

export default HomeLight;
