import React from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import styled from "styled-components";
import { TextField, Typography, Fab } from "@material-ui/core";
import { useAddLightMutation } from "generated/graphql";
import { removeDiscoveredLightFromCache, addLightToCache } from "lib/graphqlHelpers";
import routes from "lib/routes";
import AddLightHeader from "./components/AddLightHeader";

const AddLightContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "content";
`;

const Header = styled(AddLightHeader)`
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
  margin-bottom: auto;
  margin-left: 24px;
  margin-right: 24px;
`;

const BottomButton = styled(Fab)`
  margin-bottom: 24px;
  margin-left: 24px;
  margin-right: 24px;
`;

const AddLight = (_: RouteComponentProps): React.FunctionComponentElement<RouteComponentProps> => {
  const [newLight, setNewLight] = React.useState("");
  const [toSetupLight, setToSetupLight] = React.useState(false);
  const [addLight, { loading }] = useAddLightMutation();

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
    setNewLight(e.target.value);
  };

  const handleAddCustomLight = (): void => {
    addLight({
      variables: { id: newLight },
      update: (proxy, { data: addLightData }): void => {
        if (!addLightData || !addLightData.addLight) return;
        const lightToAdd = addLightData.addLight;

        removeDiscoveredLightFromCache(proxy, lightToAdd);
        addLightToCache(proxy, lightToAdd);
      },
    }).then((): void => {
      setToSetupLight(true);
    });
  };

  const handleKeyDown: React.KeyboardEventHandler = (e): void => {
    const { key } = e;
    if (key === "Enter" && newLight) {
      handleAddCustomLight();
    }
  };

  if (toSetupLight === true) {
    return <Redirect to={{ pathname: routes.setupLight, state: { lightId: newLight } }} />;
  }

  return (
    <AddLightContainer>
      <Header />
      <Content>
        <PageTitle variant="h5" align="center">
          Enter the Light ID
        </PageTitle>
        <StyledTextField
          label="Light ID"
          value={newLight}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          variant="filled"
          color="primary"
          autoFocus
          disabled={loading}
        />
        <BottomButton
          variant="extended"
          color="primary"
          aria-label="add light"
          onClick={handleAddCustomLight}
          disabled={!newLight || loading}
        >
          Add Light
        </BottomButton>
      </Content>
    </AddLightContainer>
  );
};

export default AddLight;
