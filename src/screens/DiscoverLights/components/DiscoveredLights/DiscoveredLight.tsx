import React from "react";
import LightIcon from "mdi-material-ui/Lightbulb";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from "@material-ui/core";
import IdentifyIcon from "@material-ui/icons/Search";
import styled from "styled-components";
import { Light, useAddLightMutation } from "generated/graphql";
import { removeDiscoveredLightFromCache, addLightToCache } from "lib/graphqlHelpers";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const StyledLightAvatar = styled(Avatar)`
  background-color: ${props => props.theme.palette.primary.main};
  color: ${props => props.theme.palette.getContrastText(props.theme.palette.primary.main)};
`;
/* eslint-enable @typescript-eslint/explicit-function-return-type */

export interface DiscoveredLightProps extends Pick<Light, "id"> {}

// TODO: Implement Identify
const DiscoveredLight = (
  props: DiscoveredLightProps
): React.FunctionComponentElement<DiscoveredLightProps> => {
  const { id } = props;

  const [addLight] = useAddLightMutation();
  // React.MouseEventHandler
  const handleAddLight = (): void => {
    addLight({
      variables: { id },
      update: (proxy, { data: addLightData }): void => {
        if (!addLightData || !addLightData.addLight) return;
        const lightToAdd = addLightData.addLight;

        /**
         * Note: This will not automatically remove the light from the discoveredLights list if a
         * discoveredLights query is already in flight. It will correctly update after the query is finished.
         */
        removeDiscoveredLightFromCache(proxy, lightToAdd);
        addLightToCache(proxy, lightToAdd);
      },
    });
  };

  return (
    <ListItem button onClick={handleAddLight}>
      <ListItemAvatar>
        <StyledLightAvatar>
          <LightIcon />
        </StyledLightAvatar>
      </ListItemAvatar>
      <ListItemText primary={id} secondary="Tap to pair" />
      <ListItemSecondaryAction>
        <IconButton edge="end" aria-label="delete" onClick={(): void => console.log("identify")}>
          <IdentifyIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default DiscoveredLight;
