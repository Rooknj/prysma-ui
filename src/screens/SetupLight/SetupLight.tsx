import React from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { TextField, Typography, Fab } from "@material-ui/core";
import SetupLightHeader from "./components/SetupLightHeader";

const SetupLightContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "content";
`;

const Header = styled(SetupLightHeader)`
  grid-area: header;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: content;
  justify-content: space-between;
`;

const PageTitle = styled(Typography)`
  margin-top: 24px;
  margin-bottom: 24px;
`;

const StyledTextField = styled(TextField)`
  margin-left: 24px;
  margin-right: 24px;
`;

const BottomButton = styled(Fab)`
  margin-top: auto;
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
`;

const SetupLight = (
  _: RouteComponentProps
): React.FunctionComponentElement<RouteComponentProps> => {
  const [newLightName, setNewLightName] = React.useState("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setNewLightName(e.target.value);
  };

  const handleRenameLight = (): void => {
    alert("Rename Light");
  };

  const handleKeyDown: React.KeyboardEventHandler = (e): void => {
    const { key } = e;
    if (key === "Enter" && newLightName) {
      handleRenameLight();
    }
  };

  return (
    <SetupLightContainer>
      <Header />
      <Content>
        <PageTitle variant="h5" align="center">
          Name Your Light
        </PageTitle>
        <StyledTextField
          label="Name"
          value={newLightName}
          onChange={handleChange}
          variant="filled"
          color="primary"
          onKeyDown={handleKeyDown}
        />
        <BottomButton
          variant="extended"
          color="primary"
          aria-label="add light"
          onClick={handleRenameLight}
          // disabled={loading}
        >
          Add Light
        </BottomButton>
      </Content>
    </SetupLightContainer>
  );
};

export default SetupLight;
