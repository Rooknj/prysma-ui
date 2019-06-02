import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link, Redirect } from "react-router-dom";
import {
  useLight,
  useSetLightState,
  useRemoveLight,
  useSetLight
} from "common/customHooks";
import styled from "styled-components";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Slider from "common/components/Slider";
import CircleColorPicker from "common/components/CircleColorPicker";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const LightPage = props => {
  const { match } = props;

  const [newName, setNewName] = React.useState("");
  const [removed, setRemoved] = React.useState(false);

  const lightId = match.params.id;
  const { data, error, loading } = useLight(lightId);
  const setLight = useSetLight();
  const setLightState = useSetLightState();
  const removeLight = useRemoveLight();

  console.log(data, error, loading);

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleRenameLight = () => {
    setLight(lightId, { name: newName }).then(() => {
      setNewName("");
    });
  };

  const handleRemoveLight = () => {
    removeLight(lightId).then(() => setRemoved(true));
  };

  const handleOnChange = currentLightState => e => {
    const newLightState = {
      on: e.target.checked
    };

    setLightState(currentLightState.id, newLightState, currentLightState);
  };

  const handleBrightnessChange = currentLightState => brightness => {
    const newLightState = {
      brightness
    };

    setLightState(currentLightState.id, newLightState, currentLightState);
  };

  const handleColorChange = currentLightState => color => {
    const { r, g, b } = color.rgb;
    const newLightState = {
      color: { r, g, b }
    };

    setLightState(currentLightState.id, newLightState, currentLightState);
  };

  const handleEffectChange = (effect, currentLightState) => () => {
    const newLightState = {
      effect
    };

    setLightState(currentLightState.id, newLightState, currentLightState);
  };

  const handleSpeedChange = currentLightState => speed => {
    const newLightState = {
      speed
    };

    setLightState(currentLightState.id, newLightState, currentLightState);
  };

  let Body;
  if (loading) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else {
    const light = data.light;
    const {
      id,
      name,
      supportedEffects,
      ipAddress,
      macAddress,
      numLeds,
      udpPort,
      version,
      hardware,
      colorOrder,
      stripType
    } = light;
    const { connected, on, brightness, color, effect, speed } = light.state;
    Body = (
      <div>
        <Typography variant="h3">{light.name}</Typography>
        <Typography variant="h6">{"Rename the light: "}</Typography>
        <TextField
          placeholder="New Light Name"
          value={newName}
          color="primary"
          onChange={handleNameChange}
        />
        <Button onClick={handleRenameLight} color="primary">
          Rename
        </Button>
        <Typography variant="h6">{`Connected: ${connected}`}</Typography>
        <StyledDiv>
          <Typography variant="h6">{"On: "}</Typography>
          <Switch
            checked={on}
            onChange={handleOnChange(light.state)}
            disabled={!connected}
            color="primary"
          />
        </StyledDiv>
        <Typography variant="h6">{"Brightness: "}</Typography>
        <Slider
          value={brightness}
          min={0}
          max={100}
          step={1}
          onChange={handleBrightnessChange(light.state)}
          disabled={!connected}
          color="primary"
        />
        <Typography variant="h6">{"Color: "}</Typography>
        <CircleColorPicker
          color={color}
          onChange={handleColorChange(light)}
          height={320}
          width={320}
        />
        <Typography variant="h6">{`Current Effect: ${effect}`}</Typography>
        {supportedEffects &&
          supportedEffects.map(supportedEffect => (
            <Button
              key={supportedEffect}
              disabled={!connected}
              color="primary"
              onClick={handleEffectChange(supportedEffect, light)}
            >
              {supportedEffect}
            </Button>
          ))}
        <Typography variant="h6">{"Effect Speed:"}</Typography>
        <Slider
          value={speed}
          min={1}
          max={7}
          step={1}
          onChange={handleSpeedChange(light.state)}
          color="primary"
          disabled={!connected}
        />
        <Typography variant="h6">{"Config Info:"}</Typography>
        <Typography variant="body1">{`ID: ${id}`}</Typography>
        <Typography variant="body1">{`Name: ${name}`}</Typography>
        <Typography variant="body1">{`IP Address: ${ipAddress}`}</Typography>
        <Typography variant="body1">{`MAC Address: ${macAddress}`}</Typography>
        <Typography variant="body1">{`Number of LEDs: ${numLeds}`}</Typography>
        <Typography variant="body1">{`UDP Port: ${udpPort}`}</Typography>
        <Typography variant="body1">{`Version: ${version}`}</Typography>
        <Typography variant="body1">{`Hardware: ${hardware}`}</Typography>
        <Typography variant="body1">{`Color Order: ${colorOrder}`}</Typography>
        <Typography variant="body1">{`Strip Type: ${stripType}`}</Typography>
        <Typography variant="h6">{"Remove the light: "}</Typography>
        <Button onClick={handleRemoveLight} color="primary">
          Remove
        </Button>
        {removed && <Redirect push to="/" />}
      </div>
    );
  }

  return (
    <div>
      <Link to={"/"}>
        <Button>{"< Back"}</Button>
      </Link>
      {Body}
    </div>
  );
};

export default LightPage;
