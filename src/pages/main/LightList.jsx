import React, { useState, useEffect } from "react";
import { useSetLightState, useRemoveLight } from "common/customHooks";
import update from "immutability-helper";
import { ReorderableContainer, ReorderableItem } from "common/reorderable";
import Light from "./Light";

const LightList = props => {
  const { lights } = props;

  const [sortableLights, setSortableLights] = useState(lights);
  useEffect(() => {
    setSortableLights(lights);
  }, [lights]);
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

  const onSortEnd = ({ newIndex, oldIndex }) => {
    const draggedItem = sortableLights[oldIndex];
    const newLights = update(sortableLights, {
      $splice: [[oldIndex, 1], [newIndex, 0, draggedItem]],
    });
    setSortableLights(newLights);
  };

  return (
    <ReorderableContainer onSortEnd={onSortEnd} useDragHandle>
      {sortableLights.map((light, index) => (
        <ReorderableItem key={light.id} index={index}>
          <Light
            light={light}
            onRemove={handleRemoveLight(light)}
            onStateChange={handleStateChange(light.state)}
          />
        </ReorderableItem>
      ))}
    </ReorderableContainer>
  );
};

export default LightList;
