import React from "react";
import styled from "styled-components";
import { Link as RouterLink, RouteComponentProps } from "react-router-dom";
import routes from "lib/routes";
import Link from "@material-ui/core/Link";
import { useDiscoveredLightsQuery } from "generated/graphql";
import LoadingState from "components/LoadingState";
import ErrorState from "components/ErrorState";
import DiscoverLightsHeader from "./components/DiscoverLightsHeader";
import DiscoveredLights from "./components/DiscoveredLights";
import EmptyState from "./components/EmptyState";

const DiscoverLightsContainer = styled.div`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-rows: 56px 1fr auto;
  grid-template-areas:
    "header"
    "content"
    "footer";
`;

const Header = styled(DiscoverLightsHeader)`
  grid-area: header;
`;

const Content = styled.div`
  grid-area: content;
  overflow-y: auto;
`;

const Footer = styled.div`
  grid-area: footer;
  text-align: center;
  margin-bottom: 24px;
`;

const DiscoverLights = (
  _: RouteComponentProps
): React.FunctionComponentElement<RouteComponentProps> => {
  const { data, loading, error } = useDiscoveredLightsQuery({
    fetchPolicy: "network-only",
    pollInterval: 3000,
  });

  let Body;
  if (loading) {
    Body = <LoadingState />;
  } else if (error) {
    Body = <ErrorState />;
  } else if (!data || !data.discoveredLights || !data.discoveredLights.length) {
    Body = <EmptyState />;
  } else {
    Body = <DiscoveredLights discoveredLights={data.discoveredLights} />;
  }

  return (
    <DiscoverLightsContainer>
      <Header />
      <Content>{Body}</Content>
      <Footer>
        <Link component={RouterLink} variant="subtitle1" to={routes.addLight}>
          Manually Input ID
        </Link>
      </Footer>
    </DiscoverLightsContainer>
  );
};

export default DiscoverLights;

//   const StyledDiv = styled.div`
//   display: flex;
//   align-items: center;
// `;
// const [newLight, setNewLight] = React.useState("");
// const [addLight] = useAddLightMutation();
// const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e): void => {
//   setNewLight(e.target.value);
// };

// const handleAddCustomLight: React.MouseEventHandler = (): void => {
//   addLight({
//     variables: { id: newLight },
//     update: (proxy, { data: addLightData }): void => {
//       if (!addLightData || !addLightData.addLight) return;
//       const lightToAdd = addLightData.addLight;

//       removeDiscoveredLightFromCache(proxy, lightToAdd);
//       addLightToCache(proxy, lightToAdd);
//     },
//   }).then((): void => {
//     setNewLight("");
//   });
// };
