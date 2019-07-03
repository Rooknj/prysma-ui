import { useMutation } from "react-apollo-hooks";
import { REMOVE_LIGHT } from "common/graphqlConstants";
import { removeLightFromCache } from "common/graphqlHelpers";

const useRemoveLight = () => {
  const removeLight = useMutation(REMOVE_LIGHT);

  const updateCache = (cache, { data }) => {
    // If no data was returned, do nothing
    if (!data.removeLight) return;

    // Remove the added light from LIGHTS
    removeLightFromCache(cache, data.removeLight);
  };

  const cacheUpdatingRemoveLight = (lightId, lightData) => {
    return removeLight({
      variables: {
        lightId,
        lightData,
      },
      update: updateCache,
    });
  };

  return cacheUpdatingRemoveLight;
};

export default useRemoveLight;
