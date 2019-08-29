import React from "react";
import styled from "styled-components";
import { RouteComponentProps } from "react-router-dom";
import LoadingState from "components/LoadingState";
import ErrorState from "components/ErrorState";
import { useLightsQueryWithSubscriptions } from "lib/hooks";
import HomeHeader from "./components/HomeHeader";
import EmptyState from "./components/EmptyState";
import LightList from "./components/LightList";

const HomePageContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: auto 1fr;
  grid-template-areas:
    "header"
    "content";
`;

const Header = styled(HomeHeader)`
  grid-area: header;
`;

const Content = styled.div`
  grid-area: content;
  padding-bottom: 24px;
`;

const Home = (_: RouteComponentProps): React.FunctionComponentElement<RouteComponentProps> => {
  const { data, error, loading, networkStatus, refetch } = useLightsQueryWithSubscriptions({
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  const handleRefetch = async (): Promise<void> => {
    refetch();
  };

  const isFirstTimeLoading = (): boolean => !!(data && !data.lights && loading);

  let Body;
  if (error) {
    Body = <ErrorState onRefresh={handleRefetch} />;
  } else if (isFirstTimeLoading() || networkStatus === 4) {
    Body = <LoadingState />;
  } else if (!data || !data.lights || !data.lights.length) {
    Body = <EmptyState />;
  } else {
    Body = <LightList lights={data.lights} />;
  }

  return (
    <HomePageContainer>
      <Header />
      <Content>{Body}</Content>
    </HomePageContainer>
  );
};

export default Home;
