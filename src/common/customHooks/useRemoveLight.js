import { useMutation } from "react-apollo-hooks";
import { REMOVE_LIGHT } from "common/graphqlConstants.js";
import { removeLightFromCache } from "common/graphqlUtils";

const useRemoveLight = () => {
  const removeLight = useMutation(REMOVE_LIGHT);

  const updateCache = (cache, { data: { removeLight } }) => {
    // If no data was returned, do nothing
    if (!removeLight) return;

    // Remove the added light from LIGHTS
    removeLightFromCache(cache, removeLight);
  };

  const cacheUpdatingRemoveLight = (lightId, lightData) => {
    return removeLight({
      variables: {
        lightId,
        lightData
      },
      update: updateCache
    });
  };

  return cacheUpdatingRemoveLight;
};

export default useRemoveLight;
