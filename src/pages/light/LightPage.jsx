import React from "react";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
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

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const AboutPage = props => {
  const { match } = props;
  console.log(match);

  const [newName, setNewName] = React.useState("");

  const lightId = match.params.id;
  const { data, error, loading } = useLight(lightId);
  console.log(data, error, loading);
  const setLight = useSetLight();
  const setLightState = useSetLightState();
  const removeLight = useRemoveLight();

  const handleNameChange = e => {
    setNewName(e.target.value);
  };

  const handleRenameLight = () => {
    setLight(lightId, { name: newName }).then(() => {
      setNewName("");
    });
  };

  const handleRemoveLight = () => {
    removeLight(lightId);
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
    const { connected, on, brightness } = light.state;
    Body = (
      <div>
        <Typography variant="h3">{light.name}</Typography>
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
        />
        <Typography variant="h6">{"Rename the light: "}</Typography>
        <TextField
          placeholder="New Light Name"
          value={newName}
          onChange={handleNameChange}
        />
        <Button onClick={handleRenameLight}>Rename</Button>
        <Typography variant="h6">{"Remove the light: "}</Typography>
        <Button onClick={handleRemoveLight}>Remove</Button>
        <Typography variant="h6">{"Config Info:"}</Typography>
        <Typography variant="body1">{`ID: ${id}`}</Typography>
      </div>
    );
  }

  return (
    <div>
      <Link to={"/"}>
        <Typography variant="body1">{"< Back"}</Typography>
      </Link>
      {Body}
    </div>
  );
};

export default AboutPage;
