import { throttle } from "lodash";

export const addLightToCache = (cacheData, { subscriptionData }) => {
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

export const removeLightFromCache = (cacheData, { subscriptionData }) => {
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
