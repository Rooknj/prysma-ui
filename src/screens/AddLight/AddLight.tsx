import React, { Fragment } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { useAddLightMutation, useDiscoveredLightsQuery } from "generated/graphql";
import { addLightToCache, removeDiscoveredLightFromCache } from "lib/graphqlHelpers";
import AddLightHeader from "./components/AddLightHeader";
import DiscoveredLightList from "./components/DiscoveredLightList";

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
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error</Typography>;
  } else if (!data || !data.discoveredLights || !data.discoveredLights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else {
    Body = <DiscoveredLightList discoveredLights={data.discoveredLights} />;
  }

  return (
    <Fragment>
      <AddLightHeader />
      <StyledDiv>
        <Button onClick={handleAddCustomLight}>Add</Button>
        <TextField placeholder="New Light ID" value={newLight} onChange={handleChange} />
      </StyledDiv>
      <Typography variant="h6" align="center">
        Select a Light to Add
      </Typography>
      {Body}
    </Fragment>
  );
};

export default AddLight;
