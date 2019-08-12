import React, { Fragment, MouseEventHandler, ChangeEventHandler } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useRemoveLightMutation, Light } from "generated/graphql";
import { useThrottledSetLightMutation } from "lib/hooks";
import { removeLightFromCache } from "lib/graphqlHelpers";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export interface LightListProps {
  lights: Light[];
}

const LightList = (props: LightListProps): React.FunctionComponentElement<LightListProps> => {
  const { lights } = props;

  const [removeLight] = useRemoveLightMutation();
  const [setLight] = useThrottledSetLightMutation();

  const handleRemoveLight = (id: string): MouseEventHandler => (): void => {
    removeLight({
      variables: { id },
      update: (proxy, { data: removeLightData }): void => {
        if (!removeLightData || !removeLightData.removeLight) return;

        const lightToRemove = removeLightData.removeLight;
        removeLightFromCache(proxy, lightToRemove);
      },
    });
  };

  const handleStateChange = (light: Light): ChangeEventHandler<HTMLInputElement> => (e): void => {
    const on = e.target.checked;

    setLight({
      variables: { id: light.id, lightData: { on } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...light,
          ...{ on },
        },
      },
    });
  };

  return (
    <Fragment>
      {lights.map(
        (light): React.FunctionComponentElement<{}> => (
          <StyledDiv key={light.id}>
            <Button onClick={handleRemoveLight(light.id)}>Remove</Button>
            <Switch
              checked={light.on}
              onChange={handleStateChange(light)}
              disabled={!light.connected}
              color="primary"
            />
            <Link to={`/light/${light.id}`}>
              <Typography variant="body1">{light.name}</Typography>
            </Link>
          </StyledDiv>
        )
      )}
    </Fragment>
  );
};

export default LightList;
