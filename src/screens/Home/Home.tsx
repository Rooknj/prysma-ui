import React, { MouseEventHandler, ChangeEventHandler, Fragment } from "react";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Switch from "@material-ui/core/Switch";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useRemoveLightMutation, Light } from "generated/graphql";
import LoadingState from "components/LoadingState";
import ErrorState from "components/ErrorState";
import { removeLightFromCache } from "lib/graphqlHelpers";
import { useLightsQueryWithSubscriptions, useThrottledSetLightMutation } from "lib/hooks";
import HomeAppBar from "./components/HomeAppBar";
import EmptyState from "./components/EmptyState";

const StyledDiv = styled.div`
  display: flex;
  align-items: center;
`;

const HomePageBody = styled.div`
  display: flex;
  @media (min-width: 600px) {
    min-height: calc(100% - 64px);
  }
  min-height: calc(100% - 56px);
  justify-content: center;
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
    refetch();
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <LoadingState />;
  } else if (error) {
    Body = <ErrorState onRefresh={handleRefetch} />;
  } else if (!data || !data.lights || !data.lights.length) {
    Body = <EmptyState />;
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
    <Fragment>
      <HomeAppBar />
      <HomePageBody>{Body}</HomePageBody>
    </Fragment>
  );
};

export default Home;
