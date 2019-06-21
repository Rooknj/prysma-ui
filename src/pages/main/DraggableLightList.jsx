import React, { useState } from "react";
import { useSetLight } from "common/customHooks";
import update from "immutability-helper";
import { sortableContainer } from "react-sortable-hoc";
import DraggableLight from "./DraggableLight";

const DragContainer = sortableContainer(({ children }) => <div>{children}</div>);
const POSITION_SPACING = 16384;

const calculateNewPosition = (newIndex, items) => {
  // Find the position of the item before where the current item is being inserted.
  // If it is inserted at the top, the before position is 0
  const beforePos = newIndex > 0 ? items[newIndex - 1].pos : 0;
  // Find the position of the item after where the current item is being inserted.
  // If it is inserted at the bottom, then the after position is null
  const afterPos = items.length > newIndex + 1 ? items[newIndex + 1].pos : null;

  // Calculate the new position
  // If moved to the top, the position is half the position of the item after it
  // If moved to the bottom, the position is the position of the item before it plus POSITION_SPACING
  // If moved between two items, the position is the average of the positions of the items before and after it.
  // If the item is being moved to an empty list, the position is the POSITION_SPACING - 1
  let pos;
  if (!beforePos && !afterPos) {
    pos = POSITION_SPACING - 1;
  } else if (beforePos && !afterPos) {
    pos = beforePos + POSITION_SPACING;
  } else if (afterPos && !beforePos) {
    pos = afterPos / 2;
  } else {
    pos = (beforePos + afterPos) / 2;
  }

  return pos;
};

const DraggableLightList = props => {
  const { lights } = props;

  const [sortableLights, setSortableLights] = useState(
    lights.map((light, index) => Object.assign({}, light, { pos: (index + 1) * POSITION_SPACING }))
  );
  const setLight = useSetLight();

  const onSortEnd = ({ newIndex, oldIndex }) => {
    if (oldIndex !== newIndex) {
      // Move the light to it's new position within the state array
      const draggedItem = sortableLights[oldIndex];
      const newLights = update(sortableLights, {
        $splice: [[oldIndex, 1], [newIndex, 0, draggedItem]],
      });

      // Calculate and set the light's new position
      const newPosition = calculateNewPosition(newIndex, newLights);
      newLights[newIndex].pos = newPosition;
      setLight(newLights[newIndex].id, { pos: newPosition });
      setSortableLights(newLights);
    }
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
