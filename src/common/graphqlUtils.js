import { throttle } from "lodash";
import { GET_LIGHTS, GET_DISCOVERED_LIGHTS } from "common/graphqlConstants.js";

export const updateCacheFromAddLightMutation = (
  cache,
  { data: { addLight } }
) => {
  // If no data was returned, do nothing
  if (!addLight) return;

  // Remove the added light from GET_DISCOVERED_LIGHTS
  const { discoveredLights } = cache.readQuery({
    query: GET_DISCOVERED_LIGHTS
  });

  cache.writeQuery({
    query: GET_DISCOVERED_LIGHTS,
    data: {
      discoveredLights: discoveredLights.filter(
        light => light.id !== addLight.id
      )
    }
  });

  // Remove the added light from GET_LIGHTS
  const { lights } = cache.readQuery({
    query: GET_LIGHTS
  });

  // If the light already exists, do nothing
  if (lights.find(light => light.id === addLight.id)) return;

  // Write the light to the cache
  cache.writeQuery({
    query: GET_LIGHTS,
    data: { lights: lights.concat([addLight]) }
  });
};

export const updateCacheFromLightAddedSubscription = (
  cacheData,
  { subscriptionData }
) => {
  // If no data was returned, do nothing
  if (!subscriptionData) return cacheData;

  // Find the id of the new light
  const newLight = subscriptionData.data.lightAdded;

  // If the light already exists in the cache, do nothing
  if (cacheData.lights.find(light => light.id === newLight.id)) {
    return cacheData;
  }

  // If the light doesnt exist, add it to the cache
  return Object.assign({}, cacheData, {
    lights: [...cacheData.lights, newLight]
  });
};

export const updateCacheFromLightRemovedSubscription = (
  cacheData,
  { subscriptionData }
) => {
  // If no data was returned, do nothing
  if (!subscriptionData) return cacheData;

  // Find the index of the light to be removed and remove it
  const lightToRemove = subscriptionData.data.lightRemoved;

  return Object.assign({}, cacheData, {
    lights: cacheData.lights.filter(light => light.id !== lightToRemove.id)
  });
};

// Need to set the throttle speed to 0 when running tests so that setLight gets called on every test
let throttleSpeed = process.env.REACT_APP_ENV === "test" ? 0 : 500;
export const throttledSetLightState = throttle(
  (setLightState, newLightState, oldLightState) => {
    // newColor will keep the __typename from the old light while assigning new color values
    const newColor = Object.assign(
      {},
      oldLightState.color,
      newLightState.color
    );
    // Set up the optimistic response
    const optimisticResponse = {
      __typename: "Mutation",
      setLightState: {
        __typename: "LightState",
        ...oldLightState,
        ...newLightState,
        color: newColor
      }
    };

    const lightId = newLightState.id;
    const lightState = Object.assign({}, newLightState);
    delete lightState["id"];
    setLightState({
      variables: {
        lightId,
        lightState
      },
      optimisticResponse
    });
  },
  throttleSpeed
);
