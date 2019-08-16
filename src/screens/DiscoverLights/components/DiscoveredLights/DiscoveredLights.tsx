import React from "react";
import styled from "styled-components";
import { Typography } from "@material-ui/core";
import { Light } from "generated/graphql";
import DiscoveredLightList from "./DiscoveredLightList";

const PageTitle = styled(Typography)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const DiscoveredLightsContainer = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
`;

const LightListContainer = styled.div`
  overflow-y: scroll;
`;

export interface DiscoveredLightsProps {
  discoveredLights: Light[];
}

const DiscoveredLights = (
  props: DiscoveredLightsProps
): React.FunctionComponentElement<DiscoveredLightsProps> => {
  const { discoveredLights } = props;
  return (
    <DiscoveredLightsContainer>
      <PageTitle variant="h5" align="center">
        Select a Light to Add
      </PageTitle>
      <LightListContainer>
        <DiscoveredLightList discoveredLights={discoveredLights} />
      </LightListContainer>
    </DiscoveredLightsContainer>
  );
};

export default DiscoveredLights;
