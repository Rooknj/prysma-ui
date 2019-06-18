import React from "react";
import { useSetLightState, useRemoveLight } from "common/customHooks";
import Light from "./Light";

const LightList = props => {
  const { lights } = props;

  const setLightState = useSetLightState();
  const removeLight = useRemoveLight();

  const handleRemoveLight = light => () => {
    removeLight(light.id);
  };

  const handleStateChange = lightState => e => {
    const newLightState = {
      on: e.target.checked,
    };

    setLightState(lightState.id, newLightState, lightState);
  };

  return lights.map(light => (
    <Light
      key={light.id}
      light={light}
      onRemove={handleRemoveLight(light)}
      onStateChange={handleStateChange(light.state)}
    />
  ));
};

export default LightList;
