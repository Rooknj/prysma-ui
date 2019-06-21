import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import DragIcon from "@material-ui/icons/DragIndicator";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(({ children }) => <span>{children}</span>);

const DraggableItem = sortableElement(({ children }) => <div>{children}</div>);

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const DraggableLight = props => {
  const { light, index } = props;

  return (
    <DraggableItem index={index}>
      <StyledDiv>
        <DragHandle>
          <DragIcon />
        </DragHandle>
        <Typography variant="body1">{light.name}</Typography>
      </StyledDiv>
    </DraggableItem>
  );
};

export default DraggableLight;
