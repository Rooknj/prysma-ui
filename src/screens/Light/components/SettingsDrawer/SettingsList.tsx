import React from "react";
import { List, ListItem, ListItemText, Divider } from "@material-ui/core";

const SettingsList = (): React.FunctionComponentElement<{}> => {
  return (
    <List component="nav">
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <Divider />
      <ListItem button divider>
        <ListItemText primary="Drafts" />
      </ListItem>
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <Divider light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  );
};

export default SettingsList;
