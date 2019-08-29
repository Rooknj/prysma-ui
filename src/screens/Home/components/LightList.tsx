import React, { Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";
import { Light } from "generated/graphql";
import HomeLight from "./HomeLight";

const StyledTypography = styled(Typography)`
  margin-top: 16px;
  margin-bottom: 16px;
`;

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-row-gap: 24px;
  margin-left: 16px;
  margin-right: 16px;
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
      <GridContainer>
        {lights.map(
          (light): React.FunctionComponentElement<{}> => (
            <HomeLight key={light.id} {...light} />
          )
        )}
      </GridContainer>
    </Fragment>
  );
};

export default LightList;
