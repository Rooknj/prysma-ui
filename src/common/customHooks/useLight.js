import { useQuery, useSubscription } from "react-apollo-hooks";
import { LIGHT, LIGHT_CHANGED, LIGHT_STATE_CHANGED } from "common/graphqlConstants.js";

const useLight = lightId => {
  const QueryData = useQuery(LIGHT, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
    variables: {
      lightId: lightId,
    },
  });

  // This will automatically update the light in the cache when it gets a message
  useSubscription(LIGHT_CHANGED);

  // This will automatically update the light state in the cache when it gets a message
  useSubscription(LIGHT_STATE_CHANGED);

  return QueryData;
};

export default useLight;
