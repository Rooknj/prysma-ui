import React from "react";
import {
  useLights,
  useSetLightState,
  useRemoveLight
} from "common/customHooks";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const MainPage = () => {
  const { data, error, loading, networkStatus, refetch } = useLights();
  const setLightState = useSetLightState();
  const removeLight = useRemoveLight();

  const handleRemoveLight = light => e => {
    removeLight(light.id);
  };

  const handleStateChange = lightState => e => {
    const newLightState = {
      on: e.target.checked
    };

    setLightState(lightState.id, newLightState, lightState);
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else if (!data.lights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else {
    Body = data.lights.map(light => (
      <StyledDiv key={light.id}>
        <Button onClick={handleRemoveLight(light)}>Remove</Button>
        <Switch
          checked={light.state.on}
          onChange={handleStateChange(light.state)}
          disabled={!light.state.connected}
          color="primary"
        />
        <Typography variant="body1">{light.name}</Typography>
      </StyledDiv>
    ));
  }
  return (
    <div>
      <Typography variant="h4">Prysma</Typography>
      <Button onClick={() => refetch()}>Refetch</Button>
      <Typography variant="h6">Light List</Typography>
      {Body}
    </div>
  );
};

export default MainPage;
