import React, { useState } from "react";
import { useSetLight } from "common/customHooks";
import update from "immutability-helper";
import { sortableContainer } from "react-sortable-hoc";
import DraggableLight from "./DraggableLight";

const DragContainer = sortableContainer(({ children }) => <div>{children}</div>);

const DraggableLightList = props => {
  const { lights } = props;

  const [sortableLights, setSortableLights] = useState(lights);
  const setLight = useSetLight();

  const onSortEnd = ({ newIndex, oldIndex }) => {
    const draggedItem = sortableLights[oldIndex];
    const newLights = update(sortableLights, {
      $splice: [[oldIndex, 1], [newIndex, 0, draggedItem]],
    });
    setSortableLights(newLights);
  };

  return (
    <DragContainer onSortEnd={onSortEnd} useDragHandle>
      {sortableLights.map((light, index) => (
        <DraggableLight key={light.id} light={light} index={index} />
      ))}
    </DragContainer>
  );
};

export default DraggableLightList;
