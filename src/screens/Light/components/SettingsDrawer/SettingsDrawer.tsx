import React from "react";
import { Dialog } from "@material-ui/core";
import SettingsHeader from "./SettingsHeader";

export interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const SettingsDrawer = (
  props: SettingsDrawerProps
): React.FunctionComponentElement<SettingsDrawerProps> => {
  const { open, onClose } = props;
  return (
    <Dialog fullScreen open={open} onClose={onClose}>
      <SettingsHeader onClose={onClose} />
      Hello World
    </Dialog>
  );
};

export default SettingsDrawer;
