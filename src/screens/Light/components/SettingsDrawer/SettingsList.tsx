import React from "react";
import { List, ListItem, ListItemText, Divider, ListSubheader } from "@material-ui/core";
import styled from "styled-components";

const StyledUl = styled.ul`
  padding: 0;
  background-color: "inherit";
`;

const StyledListSubheader = styled(ListSubheader)`
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const SettingsList = (): React.FunctionComponentElement<{}> => {
  return (
    <List subheader={<li />}>
      <li>
        <StyledUl>
          <StyledListSubheader>Display</StyledListSubheader>
          <Divider />
          <ListItem>
            <ListItemText primary="Name" />
          </ListItem>
          <Divider />
        </StyledUl>
      </li>
      <li>
        <StyledUl>
          <StyledListSubheader>Config</StyledListSubheader>
          <Divider />
          <ListItem>
            <ListItemText primary="ID" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Firmware Version" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Hardware" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Color Order" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="IP Address" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="MAC Address" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="Number of LEDs" />
          </ListItem>
          <Divider />
          <ListItem>
            <ListItemText primary="UDP Port" />
          </ListItem>
          <Divider />
        </StyledUl>
      </li>
      <li>
        <StyledUl>
          <StyledListSubheader>Danger Zone</StyledListSubheader>
          <Divider />
          <ListItem button>
            <ListItemText primary="Remove Light" />
          </ListItem>
        </StyledUl>
      </li>
    </List>
  );
};

export default SettingsList;
