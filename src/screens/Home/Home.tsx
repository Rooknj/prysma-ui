import React, { Fragment } from "react";
import styled from "styled-components";
import LoadingState from "components/LoadingState";
import ErrorState from "components/ErrorState";
import { useLightsQueryWithSubscriptions } from "lib/hooks";
import HomeHeader from "./components/HomeHeader";
import EmptyState from "./components/EmptyState";
import LightList from "./components/LightList";

const Centered = styled.div`
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

  const handleRefetch = async (): Promise<void> => {
    refetch();
  };

  let Body;
  if (loading || networkStatus === 4) {
    Body = <LoadingState />;
  } else if (error) {
    Body = (
      <Centered>
        <ErrorState onRefresh={handleRefetch} />
      </Centered>
    );
  } else if (!data || !data.lights || !data.lights.length) {
    Body = (
      <Centered>
        <EmptyState />
      </Centered>
    );
  } else {
    Body = <LightList lights={data.lights} />;
  }

  return (
    <Fragment>
      <HomeHeader />
      {Body}
    </Fragment>
  );
};

export default Home;
