import React, { MouseEventHandler, ChangeEventHandler } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRemoveLightMutation, Light } from "generated/graphql";
import { removeLightFromCache } from "lib/graphqlHelpers";
import { useLightsQueryWithSubscriptions, useThrottledSetLightMutation } from "lib/hooks";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const Home = (): React.FunctionComponentElement<{}> => {
  const { data, error, loading, networkStatus, refetch } = useLightsQueryWithSubscriptions({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const [removeLight] = useRemoveLightMutation();
  const [setLight] = useThrottledSetLightMutation();

  const handleRemoveLight = (id: string): MouseEventHandler => (): void => {
    removeLight({
      variables: { id },
      update: (proxy, { data: removeLightData }): void => {
        if (!removeLightData || !removeLightData.removeLight) return;

        const lightToRemove = removeLightData.removeLight;
        removeLightFromCache(proxy, lightToRemove);
      },
    });
  };

  const handleStateChange = (light: Light): ChangeEventHandler<HTMLInputElement> => (e): void => {
    const on = e.target.checked;

    setLight({
      variables: { id: light.id, lightData: { on } },
      optimisticResponse: {
        __typename: "Mutation",
        setLight: {
          __typename: "Light",
          ...light,
          ...{ on },
        },
      },
    });
  };

  const handleRefetch = async (): Promise<void> => {
    // TODO: Remove this once react-apollo comes out with native hooks
    if (error) {
      // Temporary fix to force a refresh when an error occurs
      // The current behavior is that refetch will not rerender the component if a graphql error was returned
      window.location.reload();
    } else {
      refetch();
    }
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <Typography variant="body1">Loading...</Typography>;
  } else if (error) {
    Body = <Typography variant="body1">Error.</Typography>;
  } else if (!data || !data.lights || !data.lights.length) {
    Body = <Typography variant="body1">None</Typography>;
  } else {
    Body = data.lights.map(
      (light): React.FunctionComponentElement<{}> => (
        <StyledDiv key={light.id}>
          <Button onClick={handleRemoveLight(light.id)}>Remove</Button>
          <Switch
            checked={light.on}
            onChange={handleStateChange(light)}
            disabled={!light.connected}
            color="primary"
          />
          <Link to={`/light/${light.id}`}>
            <Typography variant="body1">{light.name}</Typography>
          </Link>
        </StyledDiv>
      )
    );
  }

  return (
    <div>
      <Typography variant="h4">Prysma</Typography>
      <Button onClick={handleRefetch}>Refetch</Button>
      <Typography variant="h6">Light List</Typography>
      {Body}
    </div>
  );
};

export default Home;
