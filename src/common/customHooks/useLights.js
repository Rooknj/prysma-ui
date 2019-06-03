import { useQuery, useSubscription } from "react-apollo-hooks";
import {
  LIGHTS,
  LIGHT_CHANGED,
  LIGHT_STATE_CHANGED,
  LIGHT_ADDED,
  LIGHT_REMOVED,
} from "common/graphqlConstants";
import {
  removeDiscoveredLightFromCache,
  addLightToCache,
  removeLightFromCache,
} from "common/graphqlUtils";

const useLights = () => {
  const QueryData = useQuery(LIGHTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true,
  });

  // This will automatically update the light in the cache when it gets a message
  useSubscription(LIGHT_CHANGED);

  // This will automatically update the light state in the cache when it gets a message
  useSubscription(LIGHT_STATE_CHANGED);

  // This will automatically add lights to the cache when it gets a message
  useSubscription(LIGHT_ADDED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!subscriptionData.data || !subscriptionData.data.lightAdded) {
        return;
      }
      const { lightAdded } = subscriptionData.data;

      // If no data was returned, do nothing
      if (!lightAdded) return;

      // Remove the added light from discoveredLights
      removeDiscoveredLightFromCache(client, lightAdded);

      // Add the light to LIGHTS
      addLightToCache(client, lightAdded);
    },
  });

  // This will automatically remove lights from the cache when it gets a message
  useSubscription(LIGHT_REMOVED, {
    onSubscriptionData: ({ client, subscriptionData }) => {
      if (!subscriptionData.data || !subscriptionData.data.lightRemoved) {
        return;
      }
      const { lightRemoved } = subscriptionData.data;

      // If no data was returned, do nothing
      if (!lightRemoved) return;

      removeLightFromCache(client, lightRemoved);
    },
  });

  return QueryData;
};

export default useLights;
