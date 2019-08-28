import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Light } from "generated/graphql";
import HomeLight from "./HomeLight";

const StyledTypography = styled(Typography)`
  margin-top: 16px;
  margin-bottom: 16px;
`;

export interface LightListProps {
  lights: Light[];
}

const LightList = (props: LightListProps): React.FunctionComponentElement<LightListProps> => {
  const { lights } = props;

  return (
    <Fragment>
      <StyledTypography variant="h5" align="center">
        Lights
      </StyledTypography>
      {lights.map(
        (light): React.FunctionComponentElement<{}> => (
          <HomeLight key={light.id} {...light} />
        )
      )}
    </Fragment>
  );
};

export default LightList;
