import React, { ChangeEventHandler, MouseEventHandler } from "react";
import { RouteComponentProps, Link, Redirect } from "react-router-dom";
import { Light as LightEntity, useRemoveLightMutation } from "generated/graphql";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import TextField from "@material-ui/core/TextField";
import Switch from "@material-ui/core/Switch";
import Slider from "components/SmoothSlider";
import { useLightQueryWithSubscriptions, useThrottledSetLightMutation } from "lib/hooks";
import { removeLightFromCache } from "lib/graphqlHelpers";
import CircleColorPicker from "components/CircleColorPicker";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const StyledSlider = styled(Slider)`
  width: 85%;
  max-width: 400px;
  margin-left: 1rem;
  margin-top: 0.5rem;
`;

const EffectsDiv = styled.div`
  max-width: 400px;
`;

const OffsetColorDiv = styled.div`
  margin-left: 1rem;
`;

interface MatchParams {
  id: string;
}

const Light = (
  props: RouteComponentProps<MatchParams>
): React.FunctionComponentElement<RouteComponentProps<MatchParams>> => {
  const { match } = props;
  const { id } = match.params;

  // TODO: Figure out how to include cache-and-network without ts-ignore
  // We use cache-and-network
  // @ts-ignore
  const { data, error, loading } = useLightQueryWithSubscriptions({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      id,
    },
  });
  const [newName, setNewName] = React.useState("");
  const [removed, setRemoved] = React.useState(false);
  const setLight = useThrottledSetLightMutation();
  const removeLight = useRemoveLightMutation();

  const handleNameChange: ChangeEventHandler<HTMLInputElement> = (e): void => {
    setNewName(e.target.value);
  };

  const handleRenameLight = (currentLight: LightEntity): MouseEventHandler => (): void => {
    const name = newName;

    setLight({
      variables: { id: currentLight.id, lightData: { name } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ name },
        },
      },
    }).then((): void => {
      setNewName("");
    });
  };

  const handleOnChange = (currentLight: LightEntity): ChangeEventHandler<HTMLInputElement> => (
    e
  ): void => {
    const on = e.target.checked;

    setLight({
      variables: { id: currentLight.id, lightData: { on } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ on },
        },
      },
    });
  };

  const handleBrightnessChange = (currentLight: LightEntity): ((value: number) => void) => (
    brightness: number
  ): void => {
    setLight({
      variables: { id: currentLight.id, lightData: { brightness } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ brightness },
        },
      },
    });
  };

  const handleColorChange = (currentLight: LightEntity): ((value: string) => void) => (
    color
  ): void => {
    setLight({
      variables: { id: currentLight.id, lightData: { color } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ color },
        },
      },
    });
  };

  const handleEffectChange = (
    effect: string,
    currentLight: LightEntity
  ): MouseEventHandler => (): void => {
    setLight({
      variables: { id: currentLight.id, lightData: { effect } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ effect },
        },
      },
    });
  };

  const handleSpeedChange = (currentLight: LightEntity): ((value: number) => void) => (
    speed: number
  ): void => {
    setLight({
      variables: { id: currentLight.id, lightData: { speed } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...currentLight,
          ...{ speed },
        },
      },
    });
  };

  const handleRemoveLight = (currentLight: LightEntity): MouseEventHandler => (): void => {
    removeLight({
      variables: { id: currentLight.id },
      update: (proxy, { data: removeLightData }): void => {
        if (!removeLightData || !removeLightData.removeLight) return;

        const lightToRemove = removeLightData.removeLight;
        removeLightFromCache(proxy, lightToRemove);
      },
    }).then((): void => setRemoved(true));
  };

  let Body;
  if (loading) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error || !data) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else {
    const { light } = data;
    Body = (
      <div>
        <Typography variant="h3">{light.name}</Typography>
        <Typography variant="h6">Rename the light: </Typography>
        <TextField
          placeholder="New Light Name"
          value={newName}
          color="primary"
          onChange={handleNameChange}
        />
        <Button onClick={handleRenameLight(light)} color="primary">
          Rename
        </Button>
        <Typography variant="h6">{`Connected: ${light.connected}`}</Typography>
        <StyledDiv>
          <Typography variant="h6">On: </Typography>
          <Switch
            checked={light.on}
            onChange={handleOnChange(light)}
            disabled={!light.connected}
            color="primary"
          />
        </StyledDiv>
        <Typography variant="h6">Brightness:</Typography>
        <StyledSlider
          value={light.brightness}
          min={0}
          max={100}
          step={1}
          onChange={handleBrightnessChange(light)}
          disabled={!light.connected}
          color="primary"
          valueLabelDisplay="auto"
        />

        <Typography variant="h6">Color: </Typography>
        <OffsetColorDiv>
          <CircleColorPicker color={light.color} onChange={handleColorChange(light)} width={320} />
        </OffsetColorDiv>
        <Typography variant="h6">{`Current Effect: ${light.effect}`}</Typography>
        <EffectsDiv>
          {light.supportedEffects &&
            light.supportedEffects.map(
              (supportedEffect): React.FunctionComponentElement<{}> => (
                <Button
                  key={supportedEffect}
                  disabled={!light.connected}
                  color="primary"
                  onClick={handleEffectChange(supportedEffect, light)}
                >
                  {supportedEffect}
                </Button>
              )
            )}
        </EffectsDiv>
        <Typography variant="h6">Effect Speed:</Typography>
        <StyledSlider
          value={light.speed}
          min={1}
          max={7}
          step={1}
          onChange={handleSpeedChange(light)}
          color="primary"
          disabled={!light.connected}
          valueLabelDisplay="auto"
          marks
        />
        <Typography variant="h6">Config Info:</Typography>
        <Typography variant="body1">{`ID: ${light.id}`}</Typography>
        <Typography variant="body1">{`Name: ${light.name}`}</Typography>
        <Typography variant="body1">{`IP Address: ${light.ipAddress}`}</Typography>
        <Typography variant="body1">{`MAC Address: ${light.macAddress}`}</Typography>
        <Typography variant="body1">{`Number of LEDs: ${light.numLeds}`}</Typography>
        <Typography variant="body1">{`UDP Port: ${light.udpPort}`}</Typography>
        <Typography variant="body1">{`Version: ${light.version}`}</Typography>
        <Typography variant="body1">{`Hardware: ${light.hardware}`}</Typography>
        <Typography variant="body1">{`Color Order: ${light.colorOrder}`}</Typography>
        <Typography variant="body1">{`Strip Type: ${light.stripType}`}</Typography>
        <Typography variant="h6">Remove the light: </Typography>
        <Button onClick={handleRemoveLight(light)} color="primary">
          Remove
        </Button>
      </div>
    );
  }

  return (
    <div>
      <Link to="/">
        <Button>{"< Back"}</Button>
      </Link>
      {Body}
      {removed && <Redirect push to="/" />}
    </div>
  );
};

export default Light;
