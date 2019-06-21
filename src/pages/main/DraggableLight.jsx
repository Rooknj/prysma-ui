import React from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import DragIcon from "@material-ui/icons/DragIndicator";
import { sortableElement, sortableHandle } from "react-sortable-hoc";

const DragHandle = sortableHandle(DragIcon);

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  width: 400px;
`;

const DraggableLight = props => {
  const { light } = props;

  return (
    <StyledDiv>
      <DragHandle />
      <Typography variant="body1">{`${light.name} - pos: ${light.pos}`}</Typography>
    </StyledDiv>
  );
};

export default sortableElement(DraggableLight);
