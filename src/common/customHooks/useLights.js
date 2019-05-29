import { useQuery, useSubscription } from "react-apollo-hooks";
import {
  LIGHTS,
  LIGHT_CHANGED,
  LIGHT_STATE_CHANGED,
  LIGHT_ADDED,
  LIGHT_REMOVED,
  DISCOVERED_LIGHTS
} from "common/graphqlConstants.js";

const useLights = () => {
  const QueryData = useQuery(LIGHTS, {
    fetchPolicy: "cache-and-network",
    notifyOnNetworkStatusChange: true
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
      try {
        // Get the discovered lights in the cache
        // This might throw an error if the discoveredLights query hasnt been called yet
        const { discoveredLights } = client.readQuery({
          query: DISCOVERED_LIGHTS
        });

        if (discoveredLights.length > 0) {
          // Remove this newly addded light from discoveredLights if it exists
          client.writeQuery({
            query: DISCOVERED_LIGHTS,
            data: {
              discoveredLights: discoveredLights.filter(
                light => light.id !== lightAdded.id
              )
            }
          });
        }
      } catch (error) {
        console.log("Discovered Lights does not exist in the cache yet.");
      }

      // Get the current lights in the cache
      const { lights } = client.readQuery({
        query: LIGHTS
      });

      // If the light was already added, return so we don't add it again
      if (lights.find(light => light.id === lightAdded.id)) return;

      // Add the light to the cache
      client.writeQuery({
        query: LIGHTS,
        data: { lights: lights.concat([lightAdded]) }
      });
    }
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

      // Get the current lights in the cache
      const { lights } = client.readQuery({
        query: LIGHTS
      });

      // Remove the light from the cache
      client.writeQuery({
        query: LIGHTS,
        data: { lights: lights.filter(light => light.id !== lightRemoved.id) }
      });
    }
  });

  return QueryData;
};

export default useLights;
