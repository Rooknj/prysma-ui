import React from "react";
import { useLights, useSetLightState } from "common/customHooks";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const Main = () => {
  const { data, error, loading, networkStatus, refetch } = useLights();

  const setLightState = useSetLightState();

  const handleStateChange = lightState => e => {
    const newLightState = {
      on: e.target.checked
    };

    setLightState(lightState.id, newLightState, lightState);
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <div>Loading...</div>;
  } else if (error) {
    Body = <div>Error</div>;
  } else {
    Body = data.lights.map(light => (
      <FormControlLabel
        key={light.id}
        control={
          <Switch
            checked={light.state.on}
            onChange={handleStateChange(light.state)}
            disabled={!light.state.connected}
            color="primary"
          />
        }
        label={light.name}
        labelPlacement="start"
      />
    ));
  }
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">Light List</FormLabel>
      <FormGroup aria-label="position" name="position">
        <Button onClick={() => refetch()}>Refetch</Button>
        {Body}
      </FormGroup>
    </FormControl>
  );
};

export default Main;
