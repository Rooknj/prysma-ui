import React from "react";
import { Dialog, Slide, Paper } from "@material-ui/core";
// eslint-disable-next-line import/no-unresolved
import { TransitionProps } from "@material-ui/core/transitions";
import styled from "styled-components";
import SettingsHeader from "./SettingsHeader";
import SettingsList from "./SettingsList";

export interface SettingsDrawerProps {
  open: boolean;
  onClose: () => void;
}

const StyledPaper = styled(Paper)`
  background-color: ${({ theme }) => theme.palette.background.default}};
`;

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const SettingsDrawer = (
  props: SettingsDrawerProps
): React.FunctionComponentElement<SettingsDrawerProps> => {
  const { open, onClose } = props;
  return (
    <Dialog
      fullScreen
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      PaperComponent={StyledPaper}
    >
      <SettingsHeader onClose={onClose} />
      <SettingsList />
    </Dialog>
  );
};

export default SettingsDrawer;
