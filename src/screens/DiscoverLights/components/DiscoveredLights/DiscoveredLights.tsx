import React, { Fragment } from "react";
import { Typography } from "@material-ui/core";
import { Light } from "generated/graphql";
import DiscoveredLightList from "./DiscoveredLightList";

export interface DiscoveredLightsProps {
  discoveredLights: Light[];
}

const DiscoveredLights = (
  props: DiscoveredLightsProps
): React.FunctionComponentElement<DiscoveredLightsProps> => {
  const { discoveredLights } = props;
  return (
    <Fragment>
      <Typography variant="h6" align="center">
        Select a Light to Add
      </Typography>
      <DiscoveredLightList discoveredLights={discoveredLights} />{" "}
    </Fragment>
  );
};

export default DiscoveredLights;
