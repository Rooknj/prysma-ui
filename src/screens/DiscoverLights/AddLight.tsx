import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import styled from "styled-components";
import { useAddLightMutation, useDiscoveredLightsQuery } from "generated/graphql";
import { addLightToCache, removeDiscoveredLightFromCache } from "lib/graphqlHelpers";
import LoadingState from "components/LoadingState";
import ErrorState from "components/ErrorState";
import AddLightHeader from "./components/AddLightHeader";
import DiscoveredLights from "./components/DiscoveredLights";
import EmptyState from "./components/EmptyState";

// const DiscoverLightsContainer = styled.div`
//   height: 100%;
//   width: 100%;
//   display: grid;
//   grid-template-rows: 56px 1fr;
//   grid-template-areas:
//     "header"
//     "content";
// `;

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AddLight = (): React.FunctionComponentElement<{}> => {
  const [newLight, setNewLight] = React.useState("");
  const [addLight] = useAddLightMutation();
  const { data, loading, error } = useDiscoveredLightsQuery({
    fetchPolicy: "network-only",
    pollInterval: 3000,
  });

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setNewLight(e.target.value);
  };

  const handleAddCustomLight: React.MouseEventHandler = (): void => {
    addLight({
      variables: { id: newLight },
      update: (proxy, { data: addLightData }): void => {
        if (!addLightData || !addLightData.addLight) return;
        const lightToAdd = addLightData.addLight;

        removeDiscoveredLightFromCache(proxy, lightToAdd);
        addLightToCache(proxy, lightToAdd);
      },
    }).then((): void => {
      setNewLight("");
    });
  };

  let Body;
  if (loading) {
    Body = <LoadingState />;
  } else if (error) {
    Body = <ErrorState />;
  } else if (!data || !data.discoveredLights || !data.discoveredLights.length) {
    Body = <EmptyState />;
  } else {
    Body = <DiscoveredLights discoveredLights={data.discoveredLights} />;
  }

  return (
    <Fragment>
      <AddLightHeader />
      <StyledDiv>
        <Button onClick={handleAddCustomLight}>Add</Button>
        <TextField placeholder="New Light ID" value={newLight} onChange={handleChange} />
      </StyledDiv>
      {Body}
    </Fragment>
  );
};

export default AddLight;
