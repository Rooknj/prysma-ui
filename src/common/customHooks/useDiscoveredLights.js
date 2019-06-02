import { useQuery } from "react-apollo-hooks";
import { DISCOVERED_LIGHTS } from "common/graphqlConstants.js";

const useDiscoveredLights = () => {
  const QueryData = useQuery(DISCOVERED_LIGHTS, {
    fetchPolicy: "cache-and-network",
    pollInterval: 3000,
  });

  return QueryData;
};

export default useDiscoveredLights;
