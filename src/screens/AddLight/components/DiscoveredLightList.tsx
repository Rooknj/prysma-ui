import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import styled from "styled-components";
import { useAddLightMutation, Light } from "generated/graphql";
import { addLightToCache, removeDiscoveredLightFromCache } from "lib/graphqlHelpers";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

export interface LightListProps {
  discoveredLights: Light[];
}

const DiscoveredLightList = (
  props: LightListProps
): React.FunctionComponentElement<LightListProps> => {
  const { discoveredLights } = props;

  const [addLight] = useAddLightMutation();

  const handleAddLight = (id: string): React.MouseEventHandler => (): void => {
    addLight({
      variables: { id },
      update: (proxy, { data: addLightData }): void => {
        if (!addLightData || !addLightData.addLight) return;
        const lightToAdd = addLightData.addLight;

        /**
         * Note: This will not automatically remove the light from the discoveredLights list if a
         * discoveredLights query is already in flight. It will correctly update after the query is finished.
         */
        removeDiscoveredLightFromCache(proxy, lightToAdd);
        addLightToCache(proxy, lightToAdd);
      },
    });
  };

  return (
    <Fragment>
      {discoveredLights.map(
        (light): React.FunctionComponentElement<{}> => (
          <StyledDiv key={light.id}>
            <Button onClick={handleAddLight(light.id)}>Add</Button>
            <Typography variant="body1">{light.id}</Typography>
          </StyledDiv>
        )
      )}
    </Fragment>
  );
};

export default DiscoveredLightList;
