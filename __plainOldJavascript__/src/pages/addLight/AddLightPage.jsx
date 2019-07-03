import React from "react";
import { useAddLight, useDiscoveredLights } from "common/customHooks";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AddLightPage = () => {
  const [newLight, setNewLight] = React.useState("");
  const addLight = useAddLight();
  const { data } = useDiscoveredLights();

  const handleChange = e => {
    setNewLight(e.target.value);
  };

  const handleAddLight = lightId => () => {
    addLight(lightId);
  };

  const handleAddCustomLight = () => {
    addLight(newLight).then(() => {
      setNewLight("");
    });
  };

  let Body;
  if (!data.discoveredLights) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (!data.discoveredLights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else {
    Body = data.discoveredLights.map(light => (
      <StyledDiv key={light.id}>
        <Button onClick={handleAddLight(light.id)}>Add</Button>
        <Typography variant="body1">{light.id}</Typography>
      </StyledDiv>
    ));
  }
  return (
    <div>
      <Typography variant="h4">Add Light</Typography>
      <StyledDiv>
        <Button onClick={handleAddCustomLight}>Add</Button>
        <TextField placeholder="New Light ID" value={newLight} onChange={handleChange} />
      </StyledDiv>
      <Typography variant="h6">Discovered Lights</Typography>
      {Body}
    </div>
  );
};

export default AddLightPage;
