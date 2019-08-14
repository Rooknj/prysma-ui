import React, { Fragment } from "react";
import { List, Divider } from "@material-ui/core";
import { Light } from "generated/graphql";
import DiscoveredLight from "./DiscoveredLight";

export interface LightListProps {
  discoveredLights: Light[];
}

const DiscoveredLightList = (
  props: LightListProps
): React.FunctionComponentElement<LightListProps> => {
  const { discoveredLights } = props;
  return (
    <List dense>
      <Divider />
      {discoveredLights.map(
        (light): React.FunctionComponentElement<{}> => (
          <Fragment key={light.id}>
            <DiscoveredLight {...light} />
            <Divider />
          </Fragment>
        )
      )}
    </List>
  );
};

export default DiscoveredLightList;
