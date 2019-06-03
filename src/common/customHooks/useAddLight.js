import { useMutation } from "react-apollo-hooks";
import { ADD_LIGHT } from "common/graphqlConstants.js";
import { removeDiscoveredLightFromCache, addLightToCache } from "common/graphqlUtils";

const useAddLight = () => {
  const addLight = useMutation(ADD_LIGHT);

  const updateCache = (cache, { data: { addLight } }) => {
    // If no data was returned, do nothing
    if (!addLight) return;

    // Remove the added light from discoveredLights
    removeDiscoveredLightFromCache(cache, addLight);

    // Add the light to LIGHTS
    addLightToCache(cache, addLight);
  };

  const cacheUpdatingAddLight = (lightId, lightData) => {
    return addLight({
      variables: {
        lightId,
        lightData,
      },
      update: updateCache,
    });
  };

  return cacheUpdatingAddLight;
};

export default useAddLight;
