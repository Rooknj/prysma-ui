import React from "react";
import styled from "styled-components";
import Switch from "@material-ui/core/Switch";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { DragHandle } from "common/reorderable";
import DragIcon from "@material-ui/icons/DragIndicator";
// import DragIcon from '@material-ui/icons/DragHandle';

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
`;

const Light = props => {
  const { light, onRemove, onStateChange } = props;

  return (
    <StyledDiv>
      <DragHandle>
        <DragIcon />
      </DragHandle>
      <Button onClick={onRemove}>Remove</Button>
      <Switch
        checked={light.state.on}
        onChange={onStateChange}
        disabled={!light.state.connected}
        color="primary"
      />
      <Link to={`/light/${light.id}`}>
        <Typography variant="body1">{light.name}</Typography>
      </Link>
    </StyledDiv>
  );
};

export default Light;
