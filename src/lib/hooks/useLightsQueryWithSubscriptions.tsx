import {
  useLightsQuery,
  LightsQuery,
  LightsQueryVariables,
  useLightChangedSubscription,
  useLightAddedSubscription,
  useLightRemovedSubscription,
} from "generated/graphql";
import { QueryHookOptions } from "@apollo/react-hooks";
import { QueryResult } from "@apollo/react-common";
import {
  removeDiscoveredLightFromCache,
  addLightToCache,
  removeLightFromCache,
} from "lib/graphqlHelpers";

export const useLightsQueryWithSubscriptions = (
  queryOptions?: QueryHookOptions<LightsQuery, LightsQueryVariables>
): QueryResult<LightsQuery, LightsQueryVariables> => {
  const QueryData = useLightsQuery(queryOptions);

  // This will automatically update the light in the cache when it gets a message
  useLightChangedSubscription();

  // This will automatically add lights to the cache when it gets a message
  useLightAddedSubscription({
    onSubscriptionData: ({ client, subscriptionData }): void => {
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
  useLightRemovedSubscription({
    onSubscriptionData: ({ client, subscriptionData }): void => {
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
