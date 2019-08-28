import React, { ChangeEvent } from "react";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRemoveLightMutation, Light, useChangeOnMutation } from "generated/graphql";
import { removeLightFromCache } from "lib/graphqlHelpers";
import routes from "lib/routes";
import { Typography } from "@material-ui/core";
import { useThrottledMutation } from "lib/hooks";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export interface HomeLightProps extends Light {}

const HomeLight = (props: HomeLightProps): React.FunctionComponentElement<HomeLightProps> => {
  const { id, on, connected, name } = props;

  const [removeLight] = useRemoveLightMutation();
  const [changeOn] = useChangeOnMutation();

  const throttledChangeOn = useThrottledMutation(changeOn);

  const handleRemoveLight = (): void => {
    removeLight({
      variables: { id },
      update: (proxy, { data: removeLightData }): void => {
        if (!removeLightData || !removeLightData.removeLight) return;

        const lightToRemove = removeLightData.removeLight;
        removeLightFromCache(proxy, lightToRemove);
      },
    });
  };

  const handleStateChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const newOn = e.target.checked;

    throttledChangeOn({
      variables: { id, lightData: { on: newOn } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          id,
          on: newOn,
        },
      },
    });
  };

  return (
    <StyledDiv>
      <Button onClick={handleRemoveLight}>Remove</Button>
      <Switch checked={on} onChange={handleStateChange} disabled={!connected} color="primary" />
      <Link to={`${routes.light}/${id}`}>
        <Typography variant="body1">{name}</Typography>
      </Link>
    </StyledDiv>
  );
};

export default HomeLight;
